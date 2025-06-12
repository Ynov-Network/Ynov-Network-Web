import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Plus,
  Search,
  Filter,
  MessageCircle,
  Crown,
  Lock,
  Globe,
  TrendingUp
} from "lucide-react";

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const groups = [
    {
      id: "1",
      name: "Web Development Masters",
      description: "Advanced web development techniques, frameworks, and best practices. Share your projects and get feedback.",
      members: 245,
      posts: 1284,
      privacy: "public",
      category: "Tech",
      isJoined: true,
      isAdmin: false,
      avatar: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=150&h=150&fit=crop",
      cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      recentActivity: "2 hours ago"
    },
    {
      id: "2",
      name: "Design Thinking Hub",
      description: "Collaborative space for UI/UX designers and design enthusiasts. Weekly design challenges and portfolio reviews.",
      members: 156,
      posts: 892,
      privacy: "public",
      category: "Design",
      isJoined: true,
      isAdmin: true,
      avatar: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop",
      cover: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=200&fit=crop",
      recentActivity: "1 hour ago"
    },
    {
      id: "3",
      name: "Startup Founders Circle",
      description: "Exclusive community for aspiring entrepreneurs. Share business ideas, find co-founders, and get mentorship.",
      members: 89,
      posts: 456,
      privacy: "private",
      category: "Business",
      isJoined: false,
      isAdmin: false,
      avatar: "https://images.unsplash.com/photo-1553028826-f4804151e2e2?w=150&h=150&fit=crop",
      cover: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
      recentActivity: "3 hours ago"
    },
    {
      id: "4",
      name: "AI & Machine Learning",
      description: "Dive deep into artificial intelligence and machine learning. Research papers, coding challenges, and project collaborations.",
      members: 198,
      posts: 734,
      privacy: "public",
      category: "Tech",
      isJoined: false,
      isAdmin: false,
      avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
      recentActivity: "30 minutes ago"
    }
  ];

  const categories = ["All", "Tech", "Design", "Business", "Science", "Art", "Sports"];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Groups</h1>
            <p className="text-muted-foreground">Connect with like-minded students</p>
          </div>
          <Button className="bg-gradient-brand hover:opacity-90 text-white hover-scale">
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
            <Button variant="outline" className="px-4">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "secondary"}
                className={`cursor-pointer whitespace-nowrap hover-scale ${category === "All"
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-accent"
                  }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer">
              <div className="relative">
                <img
                  src={group.cover}
                  alt={group.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {group.privacy === "private" ? (
                    <Badge className="bg-red-500 text-white">
                      <Lock className="h-3 w-3 mr-1" />
                      Private
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white">
                      <Globe className="h-3 w-3 mr-1" />
                      Public
                    </Badge>
                  )}
                </div>
                <Avatar className="absolute -bottom-6 left-4 h-12 w-12 border-4 border-white">
                  <AvatarImage src={group.avatar} />
                  <AvatarFallback>{group.name[0]}</AvatarFallback>
                </Avatar>
              </div>

              <CardHeader className="pt-8 pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors flex items-center gap-2">
                      {group.name}
                      {group.isAdmin && <Crown className="h-4 w-4 text-yellow-500" />}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {group.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm line-clamp-3">{group.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{group.members}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span>{group.posts}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span>{group.recentActivity}</span>
                  </div>
                </div>

                {group.isJoined ? (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                      View Group
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full bg-gradient-brand hover:opacity-90 text-white">
                    {group.privacy === "private" ? "Request to Join" : "Join Group"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trending Groups Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Groups
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.slice(0, 4).map((group) => (
              <Card key={`trending-${group.id}`} className="p-4 hover:shadow-md transition-all duration-300 hover-scale cursor-pointer">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={group.avatar} />
                    <AvatarFallback>{group.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate hover:text-primary transition-colors">{group.name}</h3>
                    <p className="text-xs text-muted-foreground">{group.members} members</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;