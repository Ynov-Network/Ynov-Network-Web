import { Button } from "@/components/ui/button";
import { useGetMyProfile, useGetUserProfile, useGetLikedPosts } from "@/services/users/queries";
import { Link, useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFollowUser, useUnfollowUser } from "@/services/follow/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetPostsByUser } from "@/services/posts/queries";
import { PostCardSkeleton } from "@/pages/main/components/PostCardSkeleton";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  MoreHorizontal,
  MessageCircle,
  UserPlus,
  Settings,
  Image as ImageIcon
} from "lucide-react";
import PostCard from "../components/PostCard";
import { FollowListDialog } from "./FollowListDialog";

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("posts");
  const [followListState, setFollowListState] = useState<{
    isOpen: boolean;
    type: 'followers' | 'following';
  }>({ isOpen: false, type: 'followers' });

  const { data: myProfileData } = useGetMyProfile();
  const { data: userProfileData, isLoading } = useGetUserProfile(username ?? "", { enabled: !!username });

  const user = username ? userProfileData?.data : myProfileData?.data;
  const isMyProfile = !username || myProfileData?.data?.username === user?.username;

  const { data: postsData, isLoading: isLoadingPosts } = useGetPostsByUser(user?._id ?? "", { enabled: !!user?._id && activeTab === 'posts' });
  const { data: likedPostsData, isLoading: isLoadingLikedPosts } = useGetLikedPosts(user?._id ?? "", { enabled: !!user?._id && activeTab === 'liked' });

  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleOpenFollowDialog = (type: 'followers' | 'following') => {
    setFollowListState({ isOpen: true, type });
  };

  const handleFollowToggle = () => {
    if (!user) return;
    const mutation = user.is_following ? unfollowMutation : followMutation;
    mutation.mutate(user._id, {
      onSuccess: () => {
        toast.success(user.is_following ? `Unfollowed @${user?.username}` : `Followed @${user?.username}`);
        queryClient.invalidateQueries({ queryKey: ["user-profile", username] });
        queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      },
      onError: (error) => {
        toast.error(`An error occurred: ${error.message}`);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="flex-1 mb-6 mx-4">
          <div className="relative h-48 md:h-64 bg-muted animate-pulse"></div>
          <div className="bg-card">
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-10 md:-mt-16">
                <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
                  <div className="h-32 w-32 rounded-full bg-muted border-4 border-card shadow-lg animate-pulse"></div>
                  <div className="md:mt-0">
                    <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
                    <div className="h-6 w-32 bg-muted rounded mt-2 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
                  <div className="h-10 w-24 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="min-h-screen">
      <div className="flex-1 mb-6 mx-4">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 bg-gradient-brand">
          <img
            src={"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=300&fit=crop"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="bg-card">
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-10 md:-mt-16">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                  <AvatarImage src={user.profile_picture_url} />
                  <AvatarFallback className="bg-gradient-brand text-primary-foreground text-2xl font-bold">
                    {user.first_name[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="md:mt-0">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">{user.first_name} {user.last_name}</h1>
                  </div>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4 md:mt-0">
                {isMyProfile ? (
                  <Link to="/settings">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                ) : (
                  <>
                  <Link to={"/chat"}>
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </Link>
                    <Button
                      className={`${user.is_following ? 'bg-muted text-muted-foreground hover:bg-accent' : 'bg-gradient-brand hover:opacity-90 text-white'}`}
                      onClick={handleFollowToggle}
                      disabled={followMutation.isPending || unfollowMutation.isPending}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {user.is_following ? 'Following' : 'Follow'}
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Bio and Details */}
            <div className="mt-4 space-y-4">
              <p className="text-foreground leading-relaxed max-w-2xl">{user.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {(user.city || user.country) &&
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.city}, {user.country}</span>
                  </div>
                }
                {/* <div className="flex items-center space-x-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href={user.website} className="text-primary hover:underline">
                    portfolio.student.dev
                  </a>
                </div> */}
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.date_joined).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 text-sm">
                <button type="button" className="flex space-x-1 cursor-pointer hover:underline" onClick={() => handleOpenFollowDialog('following')}>
                  <span className="font-semibold">{user.following_count}</span>
                  <span className="text-muted-foreground">Following</span>
                </button>
                <button type="button" className="flex space-x-1 cursor-pointer hover:underline" onClick={() => handleOpenFollowDialog('followers')}>
                  <span className="font-semibold">{user.follower_count}</span>
                  <span className="text-muted-foreground">Followers</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="border-t border-border">
          <Tabs defaultValue="posts" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto p-0">
              <TabsTrigger
                value="posts"
                className="rounded-none text-md border-transparent data-[state=active]:bg-accent px-6 py-4"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="rounded-none text-md border-transparent data-[state=active]:bg-accent px-6 py-4"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="rounded-none text-md border-transparent data-[state=active]:bg-accent px-6 py-4"
              >
                Likes
              </TabsTrigger>
            </TabsList>

            <div>
              <TabsContent value="posts" className="space-y-6 mt-0">
                {isLoadingPosts ? (
                  Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
                ) : postsData?.data?.posts && postsData.data.posts.length > 0 ? (
                  postsData.data.posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    This user hasn't posted anything yet.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="media" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center py-12 text-muted-foreground col-span-full">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4">This user hasn't posted any media yet.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="likes" className="mt-0">
                {isLoadingLikedPosts ? (
                  Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
                ) : likedPostsData?.data && likedPostsData.data.length > 0 ? (
                  likedPostsData.data.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    This user hasn't liked any posts yet.
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      <FollowListDialog
        type={followListState.type}
        userId={user._id}
        isOpen={followListState.isOpen}
        onOpenChange={(isOpen) => setFollowListState({ ...followListState, isOpen })}
      />
    </div>
  );
};

export default Profile;