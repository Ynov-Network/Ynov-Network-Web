import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  Sparkles,
  Flame,
  Clock,
  Calendar,
} from "lucide-react";
import { Link } from "react-router";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

const Feed = () => {
  const [activeTab, setActiveTab] = useState("feed");

  // Enhanced mock data for posts with more engaging content
  const posts = [
    {
      id: "1",
      author: {
        username: "sarah.design",
        fullName: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
      },
      content: "Just shipped my latest UI project! 🚀 Spent weeks perfecting the micro-interactions and user flow. The feedback from users has been incredible - 98% satisfaction rate! Sometimes the smallest details make the biggest impact. #DesignThinking #UX",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
      likes: 127,
      comments: 23,
      shares: 8,
      timestamp: "2 hours ago",
      tags: ["design", "ynov", "project", "ui", "ux"],
      trending: true
    },
    {
      id: "2",
      author: {
        username: "alex.dev",
        fullName: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop&crop=face"
      },
      content: "Who's ready for tomorrow's JavaScript masterclass? 🔥 We'll be diving deep into advanced async patterns, custom hooks, and performance optimization. Bring your laptops and questions! Still a few spots available.",
      likes: 89,
      comments: 34,
      shares: 15,
      timestamp: "4 hours ago",
      tags: ["javascript", "masterclass", "coding", "learning"],
      trending: false
    },
    {
      id: "3",
      author: {
        username: "maria.startup",
        fullName: "Maria Gonzalez",
        avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=face"
      },
      content: "Incredible pitch session today! 💡 Three amazing startups presented their ideas to potential investors. The innovation happening at Ynov is absolutely mind-blowing. Congratulations to all the brave entrepreneurs taking the leap!",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
      likes: 156,
      comments: 19,
      shares: 22,
      timestamp: "6 hours ago",
      tags: ["entrepreneurship", "startups", "innovation", "pitching"],
      trending: true
    },
    {
      id: "4",
      author: {
        username: "tech.pioneer",
        fullName: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "AI is revolutionizing how we approach problem-solving! 🤖 Just finished building a machine learning model that predicts student performance with 94% accuracy. The applications for education are endless. Code available on my GitHub!",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop",
      likes: 203,
      comments: 41,
      shares: 35,
      timestamp: "8 hours ago",
      tags: ["ai", "machinelearning", "education", "innovation"],
      trending: true
    }
  ];

  return (
    <>
      {/* Main Feed Area */}
      <div className="flex-1 flex px-2">
        {/* Center Feed */}
        <div className="flex-1 py-6 mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-card shadow-sm rounded-xl p-1 h-12">
              <TabsTrigger
                value="feed"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-lg flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                For You
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-lg flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Following
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-lg flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Trending
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6 animate-fade-in">
              {/* Enhanced Create Post */}
              <div className="animate-scale-in">
                <CreatePost />
              </div>

              {/* Posts Feed with animations */}
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="following" className="space-y-6 animate-fade-in">
              <CreatePost />
              <Card className="p-12 text-center bg-gradient-to-br from-background to-card shadow-sm">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No posts from people you follow yet</h3>
                <p className="text-muted-foreground mb-6">Discover and follow interesting people to see their posts here</p>
                <Link to="/explore">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-opacity duration-200">
                    <Users className="h-4 w-4 mr-2" />
                    Find People to Follow
                  </Button>
                </Link>
              </Card>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6 animate-fade-in">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Trending Now</h2>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1 py-2">
                    <Clock className="h-3 w-3" />
                    <span>Updated 5m ago</span>
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    { topic: "#YnovHackathon", posts: "142 posts", growth: "+25% today" },
                    { topic: "#WebDevelopment", posts: "89 posts", growth: "+18% today" },
                    { topic: "#DesignThinking", posts: "67 posts", growth: "+12% today" },
                    { topic: "#AIInnovation", posts: "54 posts", growth: "+8% today" }
                  ].map((trend, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow duration-200 cursor-pointer bg-card">
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="font-semibold text-primary">{trend.topic}</p>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <span>{trend.posts}</span>
                              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 font-medium">
                                {trend.growth}
                              </Badge>
                            </div>
                          </div>
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {posts.filter(post => post.trending).map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar with toned down animations */}
        <div className="w-80 p-3 hidden lg:block">
          {/* Trending Topics */}
          <Card className="mb-4 overflow-hidden backdrop-blur-sm hover:shadow-md transition-shadow duration-200 border-0 shadow-sm">
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Trending at Ynov</h3>
              </div>
              <div className="space-y-2">
                {[
                  { tag: "#YnovHackathon", posts: "142 posts", hot: true },
                  { tag: "#WebDevelopment", posts: "89 posts", hot: false },
                  { tag: "#DesignThinking", posts: "67 posts", hot: true },
                  { tag: "#MachineLearning", posts: "54 posts", hot: false }
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-accent cursor-pointer transition-colors duration-200"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-primary">{topic.tag}</p>
                        {topic.hot && (
                          <Badge className="bg-red-500 text-white text-xs py-0 h-5">
                            <Flame className="h-3 w-3 mr-1" /> Hot
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{topic.posts}</p>
                    </div>
                  </div>
                ))}
                <Link to="/explore" className="block pt-2">
                  <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/5 transition-colors">
                    See more trends
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Connections */}
          <Card className="mb-4 overflow-hidden backdrop-blur-sm hover:shadow-md transition-shadow duration-200 border-0 shadow-sm">
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">People you might know</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "Emma Wilson",
                    username: "emma.code",
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                    mutualFriends: "5 mutual connections",
                    role: "Full-stack Developer"
                  },
                  {
                    name: "David Kim",
                    username: "david.tech",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                    mutualFriends: "3 mutual connections",
                    role: "UI/UX Designer"
                  }
                ].map((person, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 group-hover:ring-2 group-hover:ring-primary/20 transition-all duration-200">
                        <AvatarImage src={person.avatar} />
                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{person.name}</p>
                        <p className="text-xs text-muted-foreground">@{person.username}</p>
                        <p className="text-xs text-muted-foreground">{person.role}</p>
                        <p className="text-xs text-muted-foreground">{person.mutualFriends}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200">
                      Follow
                    </Button>
                  </div>
                ))}
                <Link to="/explore" className="block pt-2">
                  <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/5 transition-colors">
                    See more people
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="overflow-hidden backdrop-blur-sm hover:shadow-md transition-shadow duration-200 border-0 shadow-sm">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Upcoming Events</h3>
                </div>
                <Link to="/events">
                  <Badge variant="outline" className="hover:bg-accent cursor-pointer transition-colors">
                    View all
                  </Badge>
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: "Tech Talk: AI in Web Development",
                    date: "Dec 15, 2024",
                    time: "2:00 PM",
                    attendees: 45
                  },
                  {
                    title: "Design Workshop: Figma Advanced",
                    date: "Dec 18, 2024",
                    time: "10:00 AM",
                    attendees: 32
                  }
                ].map((event, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg hover:bg-accent transition-colors duration-200 cursor-pointer border border-border"
                  >
                    <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-primary">{event.attendees} attending</p>
                      <Button size="sm" variant="ghost" className="h-6 text-xs px-2 text-primary hover:bg-primary/5">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Feed;