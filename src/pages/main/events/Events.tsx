import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
} from "lucide-react";
import { useGetAllEvents } from "@/services/events/queries";
import { EventCard } from "./EventCard";
import { useDebounce } from "@/hooks/useDebounce";
import { EventDetailsDialog } from "./EventDetailsDialog";
import { EventFormDialog } from "./EventFormDialog";
import type { Event } from "@/services/events/api";

type EventCategory = "All" | "Workshop" | "Competition" | "Bootcamp" | "Seminar" | "Social";

const EventCardSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="h-48 bg-muted animate-pulse"></div>
    <CardHeader>
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

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All");
  const [isCreateOrEditOpen, setIsCreateOrEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [detailsEventId, setDetailsEventId] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: eventsData, isLoading } = useGetAllEvents({
    page: 1,
    limit: 50,
    event_type: selectedCategory === "All" ? undefined : selectedCategory,
    q: debouncedSearchQuery,
  });

  const allEvents = eventsData?.data.events ?? [];

  const handleEditEvent = (eventId: string) => {
    const eventToEdit = allEvents.find(e => e._id === eventId);
    if (eventToEdit) {
      setSelectedEvent(eventToEdit);
      setIsCreateOrEditOpen(true);
    }
  };

  const handleCreateEventClick = () => {
    setSelectedEvent(null);
    setIsCreateOrEditOpen(true);
  };

  const categories: EventCategory[] = ["All", "Workshop", "Competition", "Bootcamp", "Seminar", "Social"];

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
            <Button
              className="bg-gradient-brand hover:opacity-90 text-white hover-scale"
              onClick={handleCreateEventClick}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-6" >
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <EventCardSkeleton key={i} />)
            ) : allEvents.length > 0 ? (
              allEvents.map((event) => <EventCard key={event._id} event={event} onViewDetails={() => setDetailsEventId(event._id)} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">No events found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <EventDetailsDialog
        eventId={detailsEventId}
        onOpenChange={(isOpen) => !isOpen && setDetailsEventId(null)}
        onEdit={handleEditEvent}
      />
      <EventFormDialog
        isOpen={isCreateOrEditOpen}
        onOpenChange={setIsCreateOrEditOpen}
        event={selectedEvent}
      />
    </div>
  );
};

export default Events;