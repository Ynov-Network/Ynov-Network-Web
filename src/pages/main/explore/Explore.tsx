import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  TrendingUp,
  Hash,
  Users,
  Image as ImageIcon,
  Video,
  FileText,
  Filter,
  Compass,
} from "lucide-react";
import PostCard from "../components/PostCard";
import { useGetTrendingFeed } from "@/services/feed/queries";
import { useGetHashtags } from "@/services/hashtags/queries";
import { PostCardSkeleton } from "../components/PostCardSkeleton";
import { useSearch } from "@/services/search/queries";
import { useGetSuggestedUsers } from "@/services/users/queries";
import { useFollowUser } from "@/services/follow/mutation";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import type { Post } from "@/services/posts/api";

type SearchType = "all" | "users" | "hashtags";

function isValidSearchType(type: string | null): type is SearchType {
  return type === "all" || type === "users" || type === "hashtags";
}

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchTypeFromParams = (): SearchType => {
    const typeFromParams = searchParams.get("type");
    return isValidSearchType(typeFromParams) ? typeFromParams : 'all';
  }

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [searchType, setSearchType] = useState<SearchType>(getSearchTypeFromParams());

  const { data: publicFeed, isLoading: isPublicFeedLoading } = useGetTrendingFeed();
  const { data: hashtagsData, isLoading: areHashtagsLoading } = useGetHashtags({ sortBy: 'popular', limit: 6 });
  const { data: searchResults, isLoading: isSearchLoading } = useSearch({
    q: searchQuery,
    type: searchType,
  });
  const { data: suggestedUsersData, isLoading: areSuggestedUsersLoading } = useGetSuggestedUsers();
  const followMutation = useFollowUser();

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setSearchType(getSearchTypeFromParams());
  }, [searchParams]);

  const handleSearch = () => {
    setSearchParams({ q: searchQuery, type: searchType || "all" });
  };

  const handleFollow = (userId: string, userName: string) => {
    followMutation.mutate(userId, {
      onSuccess: () => {
        toast.success(`You are now following ${userName}`);
      },
      onError: (error) => {
        toast.error("Failed to follow user", {
          description: error.message,
        });
      }
    });
  };

  const trendingPosts = publicFeed?.pages.flatMap(page => page.data.posts) ?? [];
  const trendingTopics = hashtagsData?.data.hashtags ?? [];
  const suggestedUsers = suggestedUsersData?.data ?? [];

  const exploreCategories = [
    { name: "Trending", icon: TrendingUp, count: publicFeed?.pages[0]?.data.totalCount ?? 0 },
    { name: "Tech", icon: Hash, count: 0 },
    { name: "Design", icon: ImageIcon, count: 0 },
    { name: "Videos", icon: Video, count: 0 },
    { name: "Articles", icon: FileText, count: 0 }
  ];

  const renderTrendingPosts = () => {
    if (isPublicFeedLoading) {
      return Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />);
    }

    if (!trendingPosts || trendingPosts.length === 0) {
      return (
        <Card className="p-8 text-center col-span-full">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No trending posts yet.</h3>
          <p className="text-muted-foreground">Check back later to see what's popular!</p>
        </Card>
      );
    }

    return trendingPosts.map((post: Post) => <PostCard key={post._id} post={post} />);
  };

  const renderSearchResults = () => {
    if (isSearchLoading) {
      return (
        <div className="text-center p-8">
          <p>Searching...</p>
        </div>
      );
    }

    if (!searchResults?.data.results || (!searchResults.data.results.users.length && !searchResults.data.results.posts.length)) {
      return (
        <Card className="p-8 text-center col-span-full">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No results found for "{searchQuery}"</h3>
          <p className="text-muted-foreground">Try searching for something else.</p>
        </Card>
      );
    }

    const { users, posts } = searchResults.data.results;

    return (
      <div className="space-y-6">
        {users.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Users</h2>
            {users.map((user) => (
              <Card key={user._id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Link to={`/profile/${user._id}`} className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.profile_picture_url} />
                        <AvatarFallback>{user.first_name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.first_name} {user.last_name}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </Link>
                  </div>
                  <Button size="sm" onClick={() => handleFollow(user._id, user.username)} disabled={followMutation.isPending}>Follow</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {posts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Posts</h2>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Compass className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">Explore</h1>
              <p className="text-muted-foreground">Discover trending content and connect with new people</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-background border-b border-border">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for posts, people, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 h-12 text-lg focus:bg-background transition-colors"
            />
          </div>
          <Button variant="outline" className="px-6 h-12">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6">
        {/* Left Content */}
        <div className="flex-1">
          {searchQuery.length > 0 ? (
            renderSearchResults()
          ) : (
            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                {exploreCategories.map((category) => (
                  <TabsTrigger
                    key={category.name}
                    value={category.name.toLowerCase()}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-evenly"
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </div>
                    <Badge variant="default" className="hidden md:inline-flex ">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="trending" className="space-y-6">
                <div className="grid gap-6">
                  {renderTrendingPosts()}
                </div>
              </TabsContent>

              <TabsContent value="tech" className="space-y-6">
                <Card className="p-8 text-center">
                  <Hash className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Tech Posts</h3>
                  <p className="text-muted-foreground">Technology-related content will appear here.</p>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-6">
                <Card className="p-8 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Design Posts</h3>
                  <p className="text-muted-foreground">Design and creative content will appear here.</p>
                </Card>
              </TabsContent>

              <TabsContent value="videos" className="space-y-6">
                <Card className="p-8 text-center">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Video Content</h3>
                  <p className="text-muted-foreground">Video posts will appear here.</p>
                </Card>
              </TabsContent>

              <TabsContent value="articles" className="space-y-6">
                <Card className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Articles</h3>
                  <p className="text-muted-foreground">Long-form content and articles will appear here.</p>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardContent>
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {areHashtagsLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2 hover:bg-accent rounded-lg px-3">
                      <div className="flex-1">
                        <Skeleton className="h-4 bg-muted rounded w-3/4 mb-2" />
                        <Skeleton className="h-3 bg-muted rounded w-1/2" />
                      </div>
                      <div className="h-4 w-4 bg-muted rounded" />
                    </div>
                  ))
                ) : (
                  trendingTopics.map((topic) => (
                    <Link to={`/explore?type=hashtags&q=${topic.tag_name}`} key={topic._id} className="flex justify-between items-center py-2 hover:bg-accent rounded-lg px-3 cursor-pointer transition-all duration-300 hover-scale group">
                      <div className="flex-1">
                        <p className="font-medium text-primary group-hover:text-primary/80">#{topic.tag_name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{topic.post_count} posts</span>
                        </div>
                      </div>
                      <Hash className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Users */}
          <Card>
            <CardContent>
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-primary" />
                People to Follow
              </h3>
              <div className="space-y-4">
                {areSuggestedUsersLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                  ))
                ) : (
                  suggestedUsers.map((user) => (
                    <div key={user._id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Link to={`/profile/${user._id}`} className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.profile_picture_url} />
                            <AvatarFallback>{user.first_name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.first_name} {user.last_name}</p>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                          </div>
                        </Link>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleFollow(user._id, user.username)} disabled={followMutation.isPending}>
                        Follow
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;