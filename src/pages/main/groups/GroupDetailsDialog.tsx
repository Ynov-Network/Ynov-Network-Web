import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Edit, Trash2, LogOut, UserPlus, MessageCircle, Crown, Info } from "lucide-react";
import type { Group } from "@/services/groups/api";
import { useGetMyProfile } from "@/services/users/queries";

interface GroupDetailsDialogProps {
  group: Group | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEdit: (group: Group) => void;
  onDelete: (groupId: string) => void;
  onJoin: (groupId: string, groupName: string) => void;
  onLeave: (groupId: string) => void;
  isJoinLeavePending: boolean;
}

const GroupDetailsSkeleton = () => (
  <div className="space-y-6 p-8">
    <div className="relative">
      <Skeleton className="h-60 w-full" />
    </div>
    <div className="p-6 space-y-8 -mt-16 relative z-10">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-10 w-3/4" />
      <div className="grid md:grid-cols-2 gap-4">
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <div className="space-y-3 pt-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
    </div>
  </div>
);


export const GroupDetailsDialog = ({
  group,
  isOpen,
  onOpenChange,
  onEdit,
  onDelete,
  onJoin,
  onLeave,
  isJoinLeavePending,
}: GroupDetailsDialogProps) => {
  const { data: myProfileData } = useGetMyProfile();
  const currentUserId = myProfileData?.data?._id;

  // This check is now used to conditionally render the skeleton or the content
  if (!group) {
    // Render skeleton only if the dialog is open but group is null
    return isOpen ? (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 sm:max-w-3xl max-h-[90vh] overflow-hidden bg-background shadow-lg rounded-lg border-none outline-none">
          <GroupDetailsSkeleton />
        </DialogContent>
      </Dialog>
    ) : null;
  }

  const isCreator = group.creator_id._id === currentUserId;
  const isMember = group.members.some(member => member._id === currentUserId);

  const handleJoinClick = () => {
    // Logic from original component, unchanged
    onJoin(group._id, group.name);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-3xl max-h-[90vh] overflow-hidden bg-background shadow-lg rounded-lg border-none outline-none">
        <div className="relative overflow-y-auto max-h-[90vh]">
          <div className="relative">
            <img
              src={group.cover_image_url ?? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"}
              alt={group.name}
              className="w-full h-60 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent overflow-hidden" />
          </div>

          <div className="p-6 space-y-8 -mt-16 relative z-10">
            <DialogHeader className="text-left space-y-2">
              <Badge variant="secondary" className="w-fit">{group.topic}</Badge>
              <DialogTitle className="text-3xl font-bold text-foreground flex items-center gap-2">
                {group.name}
                {isCreator && <Crown className="h-6 w-6 text-yellow-400 shrink-0" />}
              </DialogTitle>
            </DialogHeader>

            {/* Group Stats Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Members</h3>
                  <p className="text-muted-foreground text-sm">{group.members.length}</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Posts</h3>
                  <p className="text-muted-foreground text-sm">{group.post_count}</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-lg">
                <Info className="h-5 w-5 text-primary" />
                About this group
              </h3>
              <DialogDescription className="text-muted-foreground text-base leading-relaxed whitespace-pre-wrap">
                {group.description}
              </DialogDescription>
            </div>

            {/* Admin Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">Group Admin</h3>
              <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={group.creator_id.profile_picture_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {group.creator_id.first_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">
                    {group.creator_id.first_name} {group.creator_id.last_name}
                  </p>
                  <p className="text-muted-foreground text-sm">Group Creator</p>
                </div>
              </div>
            </div>

            {/* Members Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Members ({group.members.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.members.slice(0, 18).map((p) => (
                  <Avatar key={p._id} className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={p.profile_picture_url} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      {p.first_name[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {group.members.length > 18 && (
                  <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <span className="text-muted-foreground text-xs font-semibold">+{group.members.length - 18}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 z-20 bg-background/80 backdrop-blur-sm border-t border-border p-4 mt-4">
            <DialogFooter className="sm:justify-end gap-2">
              {isCreator ? (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Group
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the group.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(group._id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Confirm Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button onClick={() => { onOpenChange(false); onEdit(group); }}>
                    <Edit className="h-4 w-4 mr-2" /> Edit Group
                  </Button>
                </>
              ) : isMember ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isJoinLeavePending}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {isJoinLeavePending ? 'Leaving...' : 'Leave Group'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Leave Group?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to leave this group? You can always rejoin later if it's public.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onLeave(group._id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Confirm Leave
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button onClick={handleJoinClick} disabled={isJoinLeavePending}>
                  {isJoinLeavePending ? (
                    <>
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Join Group
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};