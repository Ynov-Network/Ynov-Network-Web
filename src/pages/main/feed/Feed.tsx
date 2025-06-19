import { useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserFeed, useGetTrendingFeed, useGetForYouFeed } from "@/services/feed/queries";
import { PostCardSkeleton } from "../components/PostCardSkeleton";
import type { Post } from "@/services/posts/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetSuggestedUsers } from "@/services/users/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Feed = () => {
  const [activeTab, setActiveTab] = useState("for-you");


  const {
    data: forYouData,
    isLoading: forYouLoading,
    fetchNextPage: fetchNextForYou,
    hasNextPage: hasNextForYou,
  } = useGetForYouFeed({ enabled: activeTab === 'for-you' });

  const {
    data: followingData,
    isLoading: followingLoading,
    fetchNextPage: fetchNextFollowing,
    hasNextPage: hasNextFollowing,
  } = useGetUserFeed({ enabled: activeTab === 'following' });

  const {
    data: trendingData,
    isLoading: trendingLoading,
    fetchNextPage: fetchNextTrending,
    hasNextPage: hasNextTrending,
  } = useGetTrendingFeed({ enabled: activeTab === 'trending' });

  const renderPostSkeletons = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );

  const renderFeed = (
    data: any,
    fetchNextPage: () => void,
    hasNextPage: boolean | undefined,
    isLoading: boolean
  ) => {
    const posts = data?.pages.flatMap((page: any) => page.data.posts) ?? [];

    if (isLoading && !posts.length) {
      return renderPostSkeletons();
    }

    if (!posts.length) {
      return (
        <div className="text-center py-10 text-muted-foreground">
          <h3 className="text-xl font-semibold">Nothing to see here yet.</h3>
          <p>Follow people or post something to see content.</p>
        </div>
      );
    }

    return (
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={renderPostSkeletons()}
        endMessage={
          <p className="text-center text-muted-foreground py-5">
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="space-y-4"
      >
        {posts.map((post: Post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    );
  };

  const SuggestedUsers = () => {
    const { data: suggestedUsersData } = useGetSuggestedUsers();
    const users = suggestedUsersData?.data.slice(0, 5);

    return (
      <div className="bg-card rounded-lg shadow p-4 sticky top-24">
        <h3 className="font-bold text-lg mb-4">Who to follow</h3>
        <div className="space-y-4">
          {users?.map(user => (
            <div key={user._id} className="flex items-center justify-between">
              <Link to={`/profile/${user.username}`} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.profile_picture_url} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{user.first_name} {user.last_name}</p>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 py-6">
      <div className="md:col-span-2 lg:col-span-3">
        <CreatePost />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" value="for-you">For You</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" value="following">Following</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" value="trending">Trending</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you" className="mt-4">
            {renderFeed(forYouData, fetchNextForYou, hasNextForYou, forYouLoading)}
          </TabsContent>
          <TabsContent value="following" className="mt-4">
            {renderFeed(followingData, fetchNextFollowing, hasNextFollowing, followingLoading)}
          </TabsContent>
          <TabsContent value="trending" className="mt-4">
            {renderFeed(trendingData, fetchNextTrending, hasNextTrending, trendingLoading)}
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden lg:block">
        <SuggestedUsers />
      </div>
    </div>
  );
};

export default Feed;