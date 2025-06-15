import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  MessageSquarePlus
} from "lucide-react";
import { useGetConversationsForUser, useGetMessagesForConversation } from "@/services/messages/queries";
import { useSendMessage, useMarkMessagesAsRead } from "@/services/messages/mutation";
import { useGetMyProfile } from "@/services/users/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { Conversation, Message } from "@/services/messages/api";
import type { UserProfile } from "@/services/users/api";
import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { CreateConversationDialog } from "./CreateConversationDialog";
import { formatRelativeTime } from "@/lib/utils";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const conversationId = params.get('conversationId');
    if (conversationId) {
      setSelectedConversationId(conversationId);
    }
  }, [location.search]);

  const { data: myProfileData } = useGetMyProfile();
  const myProfile = myProfileData?.data;

  const { data: conversationsData, isLoading: areConversationsLoading } = useGetConversationsForUser({ page: 1, limit: 20 });
  const conversations = conversationsData?.data ?? [];

  const { data: messagesData, isLoading: areMessagesLoading } = useGetMessagesForConversation(
    selectedConversationId!,
    { page: 1, limit: 50 }
  );
  const messages = messagesData?.data ?? [];

  const sendMessageMutation = useSendMessage(selectedConversationId!);
  const markAsReadMutation = useMarkMessagesAsRead();

  const selectedConversation = conversations.find((c: Conversation) => c._id === selectedConversationId);

  useEffect(() => {
    if (!myProfile?._id) return;

    socket.auth = { userId: myProfile._id };
    socket.connect();

    function onNewMessage(newMessage: Message) {
      queryClient.setQueryData(['messages', newMessage.conversation_id], (oldData: { data: Message[] } | undefined) => {
        if (!oldData) return { data: [newMessage] };
        return {
          ...oldData,
          data: [...oldData.data, newMessage],
        };
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    }

    function onNewConversation() {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      // Optional: Select the new conversation if it's relevant to the user
      // setSelectedConversationId(newConversation._id);
    }

    socket.on('newMessage', onNewMessage);
    socket.on('newConversation', onNewConversation);

    return () => {
      socket.off('newMessage', onNewMessage);
      socket.off('newConversation', onNewConversation);
      socket.disconnect();
    };
  }, [queryClient, myProfile?._id]);

  useEffect(() => {
    if (selectedConversation && selectedConversation.unread_count && selectedConversation.unread_count > 0 && selectedConversation.last_message) {
      markAsReadMutation.mutate({
        conversationId: selectedConversation._id,
        lastMessageId: selectedConversation.last_message._id,
      });
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (conversations.length > 0 && !selectedConversationId) {
      const params = new URLSearchParams(location.search);
      const conversationId = params.get('conversationId');
      if (!conversationId) {
        setSelectedConversationId(conversations[0]._id);
      }
    }
  }, [conversations, selectedConversationId, location.search]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageMutation.mutate({ content: message }, {
        onSuccess: () => {
          setMessage("");
        },
        onError: (e) => toast.error(`Failed to send message: ${(e as Error).message}`)
      });
    }
  };


  const getParticipant = (conversation: Conversation): (UserProfile & { name?: string }) | null => {
    if (!myProfile) return null;
    if (conversation.type === 'group') {
      return {
        _id: conversation._id,
        name: conversation.group_name,
        profile_picture_url: undefined, // No group avatar in schema
        first_name: conversation.group_name || "G",
        last_name: "",
        username: conversation.group_name || "Group",
        bio: "",
        country: "",
        city: "",
        follower_count: 0,
        following_count: 0,
        post_count: 0,
        date_joined: "",
        account_privacy: 'public',
        university_email: '', // Placeholder
        is_following: false, // Placeholder
      }
    }
    return conversation.participants.find((p: UserProfile) => p._id !== myProfile._id) || null;
  }

  if (areConversationsLoading) {
    return (
      <div className="h-full flex flex-1 w-full">
        <div className="w-80 bg-background border-r border-border flex flex-col">
          {/* chat list */}
          <div className="flex-1 overflow-auto p-2 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* left side */}
        <div className="flex-1 flex flex-col">
          <div className="bg-background border-b border-border px-6 py-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
          <div className="flex-1 p-6">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="h-full flex flex-1 w-full">

      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-80 bg-background border-r border-border flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-foreground">Messages</h1>
              <Button variant="ghost" size="icon" onClick={() => setCreateDialogOpen(true)}>
                <MessageSquarePlus className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 focus:bg-background transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-auto">
            {conversations
              .filter((conversation: Conversation) => {
                const participant = getParticipant(conversation);
                if (!participant) return false;
                const name = participant.name ?? `${participant.first_name} ${participant.last_name}`;
                return name.toLowerCase().includes(searchQuery.toLowerCase());
              })
              .map((conversation: Conversation) => {
                const participant = getParticipant(conversation);
                if (!participant) return null;

                return (
                  <div
                    key={conversation._id}
                    onClick={() => setSelectedConversationId(conversation._id)}
                    className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-accent ${selectedConversationId === conversation._id ? 'bg-primary/5 border-r-2 border-r-primary' : ''
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={participant.profile_picture_url} />
                          <AvatarFallback>{participant.first_name ? participant.first_name[0] : 'U'}</AvatarFallback>
                        </Avatar>
                        {/* {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )} */}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-foreground truncate">{participant.name ?? `${participant.first_name} ${participant.last_name}`}</p>
                          <span className="text-xs text-muted-foreground">{formatRelativeTime(conversation.last_message_timestamp)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.last_message?.content}</p>
                      </div>
                      {conversation.unread_count && conversation.unread_count > 0 ? (
                        <Badge>
                          {conversation.unread_count}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-background border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={getParticipant(selectedConversation)?.profile_picture_url} />
                      <AvatarFallback>{getParticipant(selectedConversation)?.first_name ? getParticipant(selectedConversation)?.first_name[0] : 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-foreground">{getParticipant(selectedConversation)?.name ?? `${getParticipant(selectedConversation)?.first_name} ${getParticipant(selectedConversation)?.last_name}`}</h2>
                      {/* <p className="text-sm text-green-500">Active now</p> */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto p-6 space-y-4">
                {areMessagesLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-3/4" />
                    <Skeleton className="h-16 w-3/4 ml-auto" />
                    <Skeleton className="h-16 w-3/4" />
                  </div>
                ) : (
                  messages.map((msg: Message) => (
                    <div
                      key={msg._id}
                      className={`flex ${msg.sender_id._id === myProfile?._id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender_id._id === myProfile?._id
                        ? 'bg-gradient-brand text-white'
                        : 'bg-muted text-foreground'
                        }`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.sender_id._id === myProfile?._id ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-background border-t border-border p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-input focus:border-primary"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && message.trim()) {
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-brand hover:opacity-90 text-white"
                    disabled={!message.trim() || sendMessageMutation.isPending}
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <MessageSquarePlus className="h-16 w-16 mb-4" />
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
      <CreateConversationDialog
        open={isCreateDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onConversationCreated={(conversationId) => {
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          setSelectedConversationId(conversationId);
        }}
      />
    </div>
  );
};

export default Chat;