import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Bookmark,
  Share2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJoinEvent, useLeaveEvent } from "@/services/events/mutation";
import { toast } from "sonner";
import type { Event } from "@/services/events/api";
import { useGetMyProfile } from "@/services/users/queries";
import clsx from "clsx";

interface EventCardProps {
  event: Event;
  onViewDetails: () => void;
}

export const EventCard = ({ event, onViewDetails }: EventCardProps) => {
  const { data: currentUser } = useGetMyProfile();
  const joinEventMutation = useJoinEvent();
  const leaveEventMutation = useLeaveEvent();

  const isParticipant = event.participants.some(
    (p) => p._id === currentUser?.data._id
  );
  const isCreator = event.creator_id._id === currentUser?.data._id;
  const isFull = event.participant_limit
    ? event.participants.length >= event.participant_limit
    : false;

  const handleJoinEvent = async () => {
    return await joinEventMutation.mutateAsync(event._id, {
      onSuccess: () => {
        toast.success("Successfully joined the event!");
      },
      onError: (error) => {
        toast.error(`Failed to join event: ${error.message}`);
      },
    });
  };

  const handleLeaveEvent = async () => {
    return await leaveEventMutation.mutateAsync(event._id, {
      onSuccess: () => {
        toast.success("Successfully left the event.");
      },
      onError: (error) => {
        toast.error(`Failed to leave event: ${error.message}`);
      },
    });
  };

  return (
    <Card
      key={event._id}
      className="p-0 overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale group cursor-pointer flex flex-col gap-4"
      onClick={onViewDetails}
    >
      <div className="relative">
        <img
          src={
            event.cover_image_url ??
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
          }
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="size-8 p-0"
          >
            <Bookmark />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="size-8 p-0"
          >
            <Share2 />
          </Button>
        </div>
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {event.event_type}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow flex flex-col">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {new Date(event.start_date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>Created {new Date(event.createdAt).getMinutes()} Ago</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <div className="flex justify-start items-center gap-3">
          <Avatar>
            <AvatarImage src={event.creator_id.profile_picture_url} />
            <AvatarFallback>{event.creator_id.first_name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-sm text-muted-foreground">
            <div>
              <span className="text-sm font-semibold text-muted-foreground">
                {event.creator_id.first_name} {event.creator_id.last_name}
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Users className="h-4 w-4" />
              <span>
                {event.participants.length}{" "}
                {event.participant_limit && `/ ${event.participant_limit}`}
              </span>
            </div>

          </div>
        </div>
        <div>
          {!isCreator && (
            <div className="mt-auto pt-4">
              {isParticipant ? (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleLeaveEvent}
                  disabled={leaveEventMutation.isPending}
                >
                  {leaveEventMutation.isPending ? "Leaving..." : "Leave Event"}
                </Button>
              ) : (
                <Button
                  className={clsx(
                    "w-full",
                    isFull
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gradient-brand hover:opacity-90"
                  )}
                  onClick={handleJoinEvent}
                  disabled={
                    joinEventMutation.isPending || (isFull && !isParticipant)
                  }
                >
                  {joinEventMutation.isPending
                    ? "Joining..."
                    : isFull
                      ? "Event Full"
                      : "Join Event"}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
