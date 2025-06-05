import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bookmark,
  Search,
  Filter,
  Folder,
  Plus,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Image as ImageIcon,
  FileText,
  Video,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SavedPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const savedItems = [
    {
      id: "1",
      type: "post",
      title: "10 Essential JavaScript Tips for Beginners",
      content: "Master these fundamental JavaScript concepts to become a better developer...",
      author: {
        username: "codemaster",
        fullName: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      savedDate: "2024-12-10",
      folder: "Programming",
      tags: ["javascript", "programming", "tips"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      likes: 234,
      comments: 45
    },
    {
      id: "2",
      type: "event",
      title: "AI & Machine Learning Workshop",
      content: "Join us for an intensive workshop on the latest AI technologies and practical applications...",
      author: {
        username: "ai.society",
        fullName: "AI Society",
        avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop&crop=face"
      },
      savedDate: "2024-12-08",
      folder: "Events",
      tags: ["ai", "workshop", "learning"],
      eventDate: "2024-12-15",
      location: "Tech Hub"
    },
    {
      id: "3",
      type: "article",
      title: "The Future of Web Design: Trends for 2025",
      content: "Explore the emerging design trends that will shape the web in 2025, from AI-powered interfaces to sustainable design practices...",
      author: {
        username: "design.guru",
        fullName: "Maya Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      savedDate: "2024-12-07",
      folder: "Design",
      tags: ["design", "trends", "web"],
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=200&fit=crop",
      readTime: "8 min read"
    },
    {
      id: "4",
      type: "video",
      title: "React Best Practices Tutorial",
      content: "Learn advanced React patterns and best practices in this comprehensive video tutorial...",
      author: {
        username: "react.teacher",
        fullName: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      savedDate: "2024-12-05",
      folder: "Programming",
      tags: ["react", "tutorial", "bestpractices"],
      duration: "45:30",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
    }
  ];

  const folders = [
    { name: "All Items", count: savedItems.length, icon: Bookmark },
    { name: "Programming", count: 2, icon: FileText },
    { name: "Design", count: 1, icon: ImageIcon },
    { name: "Events", count: 1, icon: Calendar }
  ];

  const getItemIcon = (type: string) => {
    switch (type) {
      case "post":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "article":
        return <FileText className="h-4 w-4 text-purple-500" />;
      case "video":
        return <Video className="h-4 w-4 text-red-500" />;
      default:
        return <Bookmark className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark className="h-6 w-6 text-ynov-primary" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">Saved</h1>
              <p className="text-gray-600">Your bookmarked content</p>
            </div>
          </div>
          <Button className="bg-gradient-ynov hover:opacity-90 text-white hover-scale">
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
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Folder className="h-5 w-5 text-ynov-primary" />
                Folders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {folders.map((folder) => (
                <Button
                  key={folder.name}
                  variant={folder.name === "All Items" ? "default" : "ghost"}
                  className={`w-full justify-start ${folder.name === "All Items"
                      ? "bg-ynov-primary hover:bg-ynov-primary/90 text-white"
                      : "hover:bg-gray-100"
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
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Saved</span>
                  <span className="font-medium">{savedItems.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Month</span>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="grid" className="data-[state=active]:bg-ynov-primary data-[state=active]:text-white">
                Grid View
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-ynov-primary data-[state=active]:text-white">
                List View
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-ynov-primary data-[state=active]:text-white">
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer">
                  {(item.image || item.thumbnail) && (
                    <div className="relative">
                      <img
                        src={item.image || item.thumbnail}
                        alt={item.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge className="bg-white/90 text-gray-700">
                          {getItemIcon(item.type)}
                          <span className="ml-1 capitalize">{item.type}</span>
                        </Badge>
                      </div>
                      {item.duration && (
                        <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">
                          {item.duration}
                        </Badge>
                      )}
                    </div>
                  )}

                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm leading-tight group-hover:text-ynov-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Move to folder</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2">{item.content}</p>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={item.author.avatar} />
                        <AvatarFallback>{item.author.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{item.author.fullName}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Saved {new Date(item.savedDate).toLocaleDateString()}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.folder}
                      </Badge>
                    </div>

                    {item.type === "post" && (
                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {item.comments}
                        </div>
                      </div>
                    )}

                    {item.type === "event" && (
                      <div className="text-xs text-gray-500 pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.eventDate!).toLocaleDateString()}
                        </div>
                      </div>
                    )}

                    {item.readTime && (
                      <div className="text-xs text-gray-500 pt-2 border-t">
                        {item.readTime}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              {savedItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-all duration-300 hover-scale cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {(item.image || item.thumbnail) && (
                        <img
                          src={item.image || item.thumbnail}
                          alt={item.title}
                          className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getItemIcon(item.type)}
                              <h3 className="font-semibold hover:text-ynov-primary transition-colors">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.content}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Avatar className="h-4 w-4">
                                  <AvatarImage src={item.author.avatar} />
                                  <AvatarFallback>{item.author.fullName[0]}</AvatarFallback>
                                </Avatar>
                                {item.author.fullName}
                              </div>
                              <span>•</span>
                              <span>Saved {new Date(item.savedDate).toLocaleDateString()}</span>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs">
                                {item.folder}
                              </Badge>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Move to folder</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {savedItems.map((item) => (
                  <div key={item.id} className="relative flex gap-6 pb-6">
                    <div className="relative z-10 w-8 h-8 bg-ynov-primary rounded-full flex items-center justify-center flex-shrink-0">
                      {getItemIcon(item.type)}
                    </div>
                    <Card className="flex-1 hover:shadow-md transition-all duration-300 hover-scale cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold hover:text-ynov-primary transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {new Date(item.savedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.author.avatar} />
                              <AvatarFallback>{item.author.fullName[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{item.author.fullName}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {item.folder}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;