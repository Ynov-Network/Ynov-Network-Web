import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Search
} from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";

const Chat = () => {
  // const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(0);

  // Mock chat data
  const conversations = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Hey! How's your project going?",
      timestamp: "2m ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for the study materials!",
      timestamp: "1h ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Design Team",
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Meeting tomorrow at 3 PM",
      timestamp: "3h ago",
      unread: 5,
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      content: "Hey! How's your project going?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "It's going well! Just finished the wireframes.",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Chen",
      content: "That's awesome! Can't wait to see them. Are you free for a quick call later?",
      timestamp: "10:35 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Sure! How about 2 PM?",
      timestamp: "10:36 AM",
      isOwn: true
    }
  ];

  return (
      <div className="min-h-screen bg-gray-50/50 flex w-full">

        <div className="flex-1 flex">
          {/* Chat List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-gray-50 border-0 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-auto">
              {conversations.map((conversation, index) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(index)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${selectedChat === index ? 'bg-ynov-primary/5 border-r-2 border-r-ynov-primary' : ''
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 truncate">{conversation.name}</p>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-ynov-primary text-white">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversations[selectedChat].avatar} />
                    <AvatarFallback>{conversations[selectedChat].name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-gray-900">{conversations[selectedChat].name}</h2>
                    <p className="text-sm text-green-500">Active now</p>
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
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.isOwn
                      ? 'bg-gradient-ynov text-white'
                      : 'bg-gray-100 text-gray-900'
                    }`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-white/70' : 'text-gray-500'
                      }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-gray-200 focus:border-ynov-primary"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && message.trim()) {
                        setMessage("");
                      }
                    }}
                  />
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-ynov hover:opacity-90 text-white"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Chat;