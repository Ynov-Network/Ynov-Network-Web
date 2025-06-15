import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bookmark,
  Search,
  Filter,
  Folder,
  Plus,
  FileText,
  ImageIcon,
  Calendar
} from "lucide-react";
import { useGetSavedPosts } from "@/services/saved-posts/queries";
import { useDebounce } from "@/hooks/useDebounce";
import PostCard from "../components/PostCard";
import { PostCardSkeleton } from "../components/PostCardSkeleton";

const SavedPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: savedPostsData, isLoading } = useGetSavedPosts({
    q: debouncedSearchQuery,
    limit: 50,
  });
  const savedItems = savedPostsData?.data.posts ?? [];

  const folders = [
    { name: "All Items", count: savedItems.length, icon: Bookmark },
    { name: "Programming", count: 0, icon: FileText },
    { name: "Design", count: 0, icon: ImageIcon },
    { name: "Events", count: 0, icon: Calendar }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">Saved</h1>
              <p className="text-muted-foreground">Your bookmarked content</p>
            </div>
          </div>
          <Button className="bg-gradient-brand hover:opacity-90 text-white hover-scale">
            <Plus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6">
        {/* Left Sidebar - Folders */}
        <div className="w-64 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary" />
                Folders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {folders.map((folder) => (
                <Button
                  key={folder.name}
                  variant={folder.name === "All Items" ? "default" : "ghost"}
                  className={`w-full justify-start ${folder.name === "All Items"
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "hover:bg-accent"
                    }`}
                >
                  <folder.icon className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">{folder.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {folder.count}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent>
              <h3 className="font-semibold mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Saved</span>
                  <span className="font-medium">{savedItems.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium">{savedItems.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search saved items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="px-4">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="grid" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Grid View
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                List View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)
                : savedItems.map((post) => <PostCard key={post._id} post={post} />)
              }
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)
                : savedItems.map((post) => <PostCard key={post._id} post={post} />)
              }
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;