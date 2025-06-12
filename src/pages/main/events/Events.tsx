import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
  Bookmark,
  Share2
} from "lucide-react";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: "1",
      title: "AI & Machine Learning Workshop",
      description: "Deep dive into the latest AI technologies and practical machine learning applications for students.",
      date: "2024-12-15",
      time: "14:00",
      location: "Tech Hub - Room A101",
      organizer: {
        name: "Dr. Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 45,
      maxAttendees: 60,
      category: "Workshop",
      isBookmarked: false,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
    },
    {
      id: "2",
      title: "Startup Pitch Competition",
      description: "Present your innovative business ideas to industry experts and win amazing prizes.",
      date: "2024-12-18",
      time: "18:00",
      location: "Innovation Center - Main Hall",
      organizer: {
        name: "Entrepreneurship Club",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 78,
      maxAttendees: 100,
      category: "Competition",
      isBookmarked: true,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop"
    },
    {
      id: "3",
      title: "Design Thinking Bootcamp",
      description: "Learn the fundamentals of design thinking and apply them to real-world problems.",
      date: "2024-12-20",
      time: "10:00",
      location: "Creative Studio - Floor 2",
      organizer: {
        name: "Design Society",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 32,
      maxAttendees: 40,
      category: "Bootcamp",
      isBookmarked: false,
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=200&fit=crop"
    }
  ];

  const categories = ["All", "Workshop", "Competition", "Bootcamp", "Seminar", "Social"];

  return (
    <div className="min-h-screen w-full" >
      <div className="flex-1 flex flex-col" >
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-10" >
          <div className="flex items-center justify-between" >
            <div>
              <h1 className="text-2xl font-bold gradient-text" > Events </h1>
              <p className="text-muted-foreground" > Discover and join amazing events </p>
            </div>
            <Button className="bg-gradient-brand hover:opacity-90 text-white hover-scale" >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-6" >
          {/* Search and Filters */}
          < div className="mb-6 space-y-4" >
            <div className="flex gap-4" >
              <div className="flex-1 relative" >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="px-4" >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2" >
              {
                categories.map((category) => (
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

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" >
            {
              events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer" >
                  <div className="relative" >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-2" >
                      <Button size="sm" variant="ghost" className="bg-background/90 hover:bg-background h-8 w-8 p-0" >
                        <Bookmark className={`h-4 w-4 ${event.isBookmarked ? 'text-primary fill-current' : 'text-muted-foreground'}`} />
                      </Button>
                      < Button size="sm" variant="ghost" className="bg-background/90 hover:bg-background h-8 w-8 p-0" >
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    < Badge className="absolute top-3 left-3 bg-primary text-primary-foreground" >
                      {event.category}
                    </Badge>
                  </div>

                  < CardHeader className="pb-3" >
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors" >
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  < CardContent className="space-y-4" >
                    <p className="text-muted-foreground text-sm line-clamp-2" > {event.description} </p>

                    < div className="space-y-2 text-sm text-muted-foreground" >
                      <div className="flex items-center gap-2" >
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} </span>
                      </div>
                      < div className="flex items-center gap-2" >
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.time} </span>
                      </div>
                      < div className="flex items-center gap-2" >
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="truncate" > {event.location} </span>
                      </div>
                    </div>

                    < div className="flex items-center justify-between" >
                      <div className="flex items-center gap-2" >
                        <Avatar className="h-6 w-6" >
                          <AvatarImage src={event.organizer.avatar} />
                          < AvatarFallback > {event.organizer.name[0]} </AvatarFallback>
                        </Avatar>
                        < span className="text-sm text-muted-foreground" > {event.organizer.name} </span>
                      </div>
                      < div className="flex items-center gap-1 text-sm text-muted-foreground" >
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} / {event.maxAttendees} </span>
                      </div>
                    </div>

                    < Button className="w-full bg-gradient-brand hover:opacity-90 text-white" >
                      Join Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;