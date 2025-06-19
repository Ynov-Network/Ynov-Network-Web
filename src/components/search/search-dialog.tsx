import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSearch } from "@/services/search/queries";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FileText } from "lucide-react";
import type { UserProfile } from "@/services/users/api";
import type { Post } from "@/services/posts/api";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useSearch({
    q: debouncedQuery,
    type: 'all',
    limit: 5,
  }, {
    enabled: debouncedQuery.length > 2,
  });

  const users = searchResults?.data.results.users ?? [];
  const posts = searchResults?.data.results.posts ?? [];

  const handleSelect = (url: string) => {
    navigate(url);
    onOpenChange(false);
  }

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search for friends, posts, topics..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty className={cn("py-6 text-center text-sm", (isLoading && debouncedQuery.length > 2) || debouncedQuery.length <= 2 ? "hidden" : "")}>
          No results found.
        </CommandEmpty>

        {debouncedQuery.length <= 2 && !isLoading && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Keep typing to see results...
          </div>
        )}

        {(isLoading && debouncedQuery.length > 2) && (
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        )}

        {users.length > 0 && (
          <CommandGroup heading="Users">
            {users.map((user: UserProfile) => (
              <CommandItem
                key={user._id}
                onSelect={() => handleSelect(`/profile/${user.username}`)}
                value={`${user.first_name} ${user.last_name} ${user.username}`}
              >
                <Avatar className="h-8 w-8 mr-4">
                  <AvatarImage src={user.profile_picture_url} />
                  <AvatarFallback>{user.first_name?.[0]}{user.last_name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.first_name} {user.last_name}</span>
                  <span className="text-sm text-muted-foreground">@{user.username}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {posts.length > 0 && (
          <CommandGroup heading="Posts">
            {posts.map((post: Post) => (
              <CommandItem key={post._id} onSelect={() => handleSelect(`/post/${post._id}`)} value={post.content ?? ""}>
                <div className="h-8 w-8 mr-4 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="truncate">{post.content}</p>
                  <p className="text-sm text-muted-foreground">by @{post.author_id.username}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
} 