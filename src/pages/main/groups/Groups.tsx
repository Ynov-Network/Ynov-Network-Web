import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TrendingUp,
  Plus
} from "lucide-react";
import { GroupFormDialog } from "./GroupFormDialog";
import { GroupDetailsDialog } from "./GroupDetailsDialog";
import { GroupCard } from "./GroupCard";
import { useGetAllGroups } from "@/services/groups/queries";
import { useJoinGroup, useLeaveGroup, useDeleteGroup } from "@/services/groups/mutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { Group } from "@/services/groups/api";
import { useDebounce } from "@/hooks/useDebounce";

const GroupCardSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="h-32 bg-muted animate-pulse"></div>
    <CardHeader className="pt-8 pb-3">
      <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-2"></div>
      <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
      <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
      <div className="flex items-center justify-between pt-4">
        <div className="h-10 w-24 bg-muted rounded animate-pulse"></div>
        <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
);

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const queryClient = useQueryClient();

  const { data: groupsData, isLoading } = useGetAllGroups({
    limit: 100,
    topic: selectedTopic === 'All' ? undefined : selectedTopic as Group['topic'],
    q: debouncedSearchQuery,
  });

  const joinGroupMutation = useJoinGroup();
  const leaveGroupMutation = useLeaveGroup();
  const deleteGroupMutation = useDeleteGroup();

  const handleJoinGroup = (groupId: string, groupName: string) => {
    joinGroupMutation.mutate(groupId, {
      onSuccess: () => {
        toast.success(`Successfully joined ${groupName}!`);
        queryClient.invalidateQueries({ queryKey: ['groups'] });
      },
      onError: (err) => toast.error(`Failed to join group: ${(err as Error).message}`),
    });
  };

  const handleLeaveGroup = (groupId: string) => {
    leaveGroupMutation.mutate(groupId, {
      onSuccess: () => {
        toast.success("Successfully left the group.");
        queryClient.invalidateQueries({ queryKey: ['groups'] });
        setDetailsOpen(false);
      },
      onError: (err) => toast.error(`Failed to leave group: ${(err as Error).message}`),
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    deleteGroupMutation.mutate(groupId, {
      onSuccess: () => {
        toast.success("Group deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ['groups'] });
        setDetailsOpen(false);
      },
      onError: (err) => toast.error(`Failed to delete group: ${(err as Error).message}`),
    })
  };

  const handleViewDetails = (group: Group) => {
    setSelectedGroup(group);
    setDetailsOpen(true);
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingGroup(null);
    setFormOpen(true);
  }

  const allGroups = groupsData?.data.groups ?? [];
  const topics: Array<Group['topic'] | 'All'> = ['All', 'Web Development', 'AI', 'CyberSecurity', 'Data Analytics', 'Games Development'];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Groups</h1>
            <p className="text-muted-foreground">Connect with like-minded students</p>
          </div>
          <Button onClick={openCreateForm} className="bg-gradient-brand hover:opacity-90 text-white hover-scale">
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {topics.map((topic) => (
              <Badge
                key={topic}
                variant={selectedTopic === topic ? "default" : "secondary"}
                onClick={() => setSelectedTopic(topic)}
                className={`cursor-pointer whitespace-nowrap hover-scale ${selectedTopic === topic
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-accent"
                  }`}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <GroupCardSkeleton key={i} />)
          ) : (
            allGroups.map((group) => (
              <GroupCard
                key={group._id}
                group={group}
                onJoin={handleJoinGroup}
                onViewDetails={handleViewDetails}
                isJoining={joinGroupMutation.isPending && joinGroupMutation.variables === group._id}
              />
            ))
          )}
        </div>

        {/* Trending Groups Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Discover Groups
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <GroupCardSkeleton key={i} />)
            ) : (
              allGroups.slice(0, 4).map((group) => (
                <Card key={`trending-${group._id}`} className="p-4 transition-all duration-300 hover-scale cursor-pointer bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_20px_60px_rgb(0,0,0,0.4)] backdrop-blur-sm" onClick={() => handleViewDetails(group)}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={group.creator_id.profile_picture_url} />
                      <AvatarFallback>{group.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate hover:text-primary transition-colors">{group.name}</h3>
                      <p className="text-xs text-muted-foreground">{group.members.length} members</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <GroupFormDialog
        isOpen={isFormOpen}
        onOpenChange={setFormOpen}
        group={editingGroup}
      />

      <GroupDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setDetailsOpen}
        group={selectedGroup}
        onEdit={handleEditGroup}
        onDelete={handleDeleteGroup}
        onJoin={handleJoinGroup}
        onLeave={handleLeaveGroup}
        isJoinLeavePending={joinGroupMutation.isPending || leaveGroupMutation.isPending}
      />
    </div>
  );
};

export default Groups;