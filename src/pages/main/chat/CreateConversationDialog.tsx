import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearch } from "@/services/search/queries";
import { useDebounce } from "@/hooks/useDebounce";
import type { UserProfile } from "@/services/users/api";
import { useCreateConversation } from "@/services/messages/mutation";
import { toast } from "sonner";

interface CreateConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConversationCreated: (conversationId: string) => void;
}

export const CreateConversationDialog = ({ open, onOpenChange, onConversationCreated }: CreateConversationDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { data: searchResults, isLoading } = useSearch({ q: debouncedSearchQuery, type: 'users' });
  const users = searchResults?.data.results.users ?? [];

  const createConversationMutation = useCreateConversation();

  const handleCreateConversation = async (userId: string) => {
    try {
      const data = await createConversationMutation.mutateAsync({
        recipientIds: [userId],
        type: 'one_to_one',
      });
      toast.success("Conversation started!");
      onConversationCreated(data.data._id);
      onOpenChange(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(`Failed to start conversation: ${errorMessage}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Search for people to start a conversation with.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Search for users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {isLoading ? (
              <p>Searching...</p>
            ) : (
              users.map((user: UserProfile) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => handleCreateConversation(user._id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.profile_picture_url} />
                      <AvatarFallback>{user.first_name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.first_name} {user.last_name}</p>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {!isLoading && users.length === 0 && searchQuery && (
              <p className="text-center text-muted-foreground">No users found.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 