import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetFollowers, useGetFollowing } from "@/services/follow/queries";
import type { UserProfile } from "@/services/users/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";
import { useFollowUser, useUnfollowUser } from "@/services/follow/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface FollowListDialogProps {
  type: "followers" | "following";
  userId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const UserCard = ({ user, onDialogClose }: { user: UserProfile, onDialogClose: () => void }) => {
  const queryClient = useQueryClient();
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleFollowToggle = () => {
    const mutation = user.is_following ? unfollowMutation : followMutation;
    mutation.mutate(user._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-profile", user.username] });
        queryClient.invalidateQueries({ queryKey: ["followers", user._id] });
        queryClient.invalidateQueries({ queryKey: ["following", user._id] });
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
      <Link to={`/profile/${user.username}`} onClick={onDialogClose} className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.profile_picture_url} />
          <AvatarFallback>{user.first_name?.[0]}{user.last_name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user.first_name} {user.last_name}</p>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
      </Link>
      <Button
        variant={user.is_following ? "secondary" : "default"}
        onClick={handleFollowToggle}
        disabled={followMutation.isPending || unfollowMutation.isPending}
      >
        {user.is_following ? "Following" : "Follow"}
      </Button>
    </div>
  )
}

const FollowListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    ))}
  </div>
);


export const FollowListDialog = ({ type, userId, isOpen, onOpenChange }: FollowListDialogProps) => {
  const queryHook = type === 'followers' ? useGetFollowers : useGetFollowing;
  const { data, isLoading } = queryHook(userId, { limit: 50 }, { enabled: isOpen });

  const list = data?.data?.[type] ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">{type}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto space-y-4">
          {isLoading ? (
            <FollowListSkeleton />
          ) : list.length > 0 ? (
            list.map((user) => <UserCard key={user._id} user={user} onDialogClose={() => onOpenChange(false)} />)
          ) : (
            <p className="text-muted-foreground text-center">No {type} found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 