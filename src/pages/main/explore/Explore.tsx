import { useState } from "react";
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
  Clock
} from "lucide-react";
import PostCard from "../components/PostCard";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingTopics = [
    { tag: "#YnovHackathon", posts: 142, growth: "+25%" },
    { tag: "#WebDevelopment", posts: 89, growth: "+18%" },
    { tag: "#DesignThinking", posts: 67, growth: "+12%" },
    { tag: "#MachineLearning", posts: 54, growth: "+8%" },
    { tag: "#StartupLife", posts: 43, growth: "+15%" },
    { tag: "#UIUXDesign", posts: 38, growth: "+22%" }
  ];

  const suggestedUsers = [
    {
      id: "1",
      username: "emma.code",
      fullName: "Emma Wilson",
      bio: "Full-stack developer & AI enthusiast",
      followers: 1234,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    {
      id: "2",
      username: "david.design",
      fullName: "David Kim",
      bio: "UI/UX Designer crafting digital experiences",
      followers: 892,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: false
    },
    {
      id: "3",
      username: "sofia.startup",
      fullName: "Sofia Martinez",
      bio: "Entrepreneur | Building the future",
      followers: 2156,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: true
    }
  ];

  const trendingPosts = [
    {
      id: "1",
      author: {
        username: "tech.innovator",
        fullName: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      content: "Just launched our AI-powered study assistant! 🚀 It helps students organize their notes and generates quiz questions automatically. Beta testing starts next week!",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop",
      likes: 156,
      comments: 23,
      shares: 12,
      timestamp: "2 hours ago",
      tags: ["ai", "education", "innovation"]
    },
    {
      id: "2",
      author: {
        username: "design.master",
        fullName: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      content: "New design system for our university app is finally ready! Spent 3 months perfecting every component. Swipe to see the evolution 👆",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=500&h=300&fit=crop",
      likes: 89,
      comments: 15,
      shares: 8,
      timestamp: "4 hours ago",
      tags: ["design", "ui", "ux"]
    }
  ];

  const exploreCategories = [
    { name: "Trending", icon: TrendingUp, count: 342 },
    { name: "Tech", icon: Hash, count: 156 },
    { name: "Design", icon: ImageIcon, count: 89 },
    { name: "Videos", icon: Video, count: 67 },
    { name: "Articles", icon: FileText, count: 124 }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Compass className="h-6 w-6 text-ynov-primary" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">Explore</h1>
              <p className="text-gray-600">Discover trending content and connect with new people</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for posts, people, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg bg-gray-50 border-0 focus:bg-white transition-colors"
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
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              {exploreCategories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name.toLowerCase()}
                  className="data-[state=active]:bg-ynov-primary data-[state=active]:text-white flex items-center gap-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                  <Badge variant="secondary" className="hidden md:inline-flex">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="trending" className="space-y-6">
              <div className="grid gap-6">
                {trendingPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tech" className="space-y-6">
              <Card className="p-8 text-center">
                <Hash className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tech Posts</h3>
                <p className="text-gray-500">Technology-related content will appear here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <Card className="p-8 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Design Posts</h3>
                <p className="text-gray-500">Design and creative content will appear here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <Card className="p-8 text-center">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Video Content</h3>
                <p className="text-gray-500">Video posts will appear here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="articles" className="space-y-6">
              <Card className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Articles</h3>
                <p className="text-gray-500">Long-form content and articles will appear here.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-ynov-primary" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex justify-between items-center py-2 hover:bg-gray-50 rounded-lg px-3 cursor-pointer transition-all duration-300 hover-scale group">
                    <div className="flex-1">
                      <p className="font-medium text-ynov-primary group-hover:text-ynov-primary/80">{topic.tag}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{topic.posts} posts</span>
                        <span className="text-green-500">{topic.growth}</span>
                      </div>
                    </div>
                    <Hash className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Users */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-ynov-primary" />
                People to Follow
              </h3>
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="h-12 w-12 group-hover:scale-110 transition-transform duration-300">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-sm truncate group-hover:text-ynov-primary transition-colors">{user.fullName}</p>
                          {user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                        <p className="text-xs text-gray-400 truncate">{user.bio}</p>
                        <p className="text-xs text-gray-400">{user.followers} followers</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-ynov-primary hover:bg-ynov-primary/90 text-white ml-2 hover-scale">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-ynov-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: "New member joined", time: "2 minutes ago", type: "join" },
                  { action: "Tech event created", time: "15 minutes ago", type: "event" },
                  { action: "Design challenge started", time: "1 hour ago", type: "challenge" },
                  { action: "Study group formed", time: "3 hours ago", type: "group" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="w-2 h-2 bg-ynov-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;