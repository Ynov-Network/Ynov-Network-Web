import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useGetEventById } from "@/services/events/queries";
import { useDeleteEvent } from "@/services/events/mutation";
import { useGetMyProfile } from "@/services/users/queries";
import { toast } from "sonner";
import { Calendar, MapPin, Users, Edit, Trash2, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";

interface EventDetailsDialogProps {
  eventId: string | null;
  onOpenChange: (isOpen: boolean) => void;
  onEdit: (eventId: string) => void;
}

const EventDetailsSkeleton = () => (
  <div className="space-y-6 p-8">
    <div className="relative">
      <Skeleton className="h-60 w-full" />
    </div>
    <div className="p-6 space-y-8 -mt-16 relative z-10">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-10 w-3/4" />
      <div className="grid md:grid-cols-2 gap-4">
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <div className="space-y-3 pt-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
    </div>
  </div>
);

export const EventDetailsDialog = ({ eventId, onOpenChange, onEdit }: EventDetailsDialogProps) => {
  const queryClient = useQueryClient();
  const { data: eventData, isLoading } = useGetEventById(eventId!);
  const { data: currentUserData } = useGetMyProfile();

  const deleteEventMutation = useDeleteEvent();

  const event = eventData?.data;
  const currentUser = currentUserData?.data;
  const isCreator = currentUser?._id === event?.creator_id._id;

  const handleDelete = async () => {
    if (!eventId) return;
    await deleteEventMutation.mutateAsync(eventId, {
      onSuccess: () => {
        toast.success("Event deleted successfully.");
        onOpenChange(false);
        queryClient.invalidateQueries({ queryKey: ["events"] });
      },
      onError: () => {
        toast.error(`Failed to delete event`);
      },
    });
  };

  const handleEdit = () => {
    if (!eventId) return;
    onOpenChange(false);
    onEdit(eventId);
  };

  const isOpen = !!eventId;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-3xl max-h-[90vh] overflow-hidden bg-background shadow-lg rounded-lg border-none outline-none">
        {isLoading || !event ? (
          <EventDetailsSkeleton />
        ) : (
          <div className="relative overflow-y-auto max-h-[90vh]">
            <div className="relative">
              <img
                src={event.cover_image_url ?? "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"}
                alt={event.title}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent overflow-hidden" />
            </div>

            <div className="p-6 space-y-8 -mt-16 relative z-10">
              <DialogHeader className="text-left space-y-2">
                <Badge variant="secondary" className="w-fit">{event.event_type}</Badge>
                <DialogTitle className="text-3xl font-bold text-foreground">
                  {event.title}
                </DialogTitle>
              </DialogHeader>

              {/* Event Details Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Date & Time</h3>
                    <p className="text-muted-foreground text-sm">
                      {new Date(event.start_date).toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground text-sm">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5 text-primary" />
                  About this event
                </h3>
                <DialogDescription className="text-muted-foreground text-base leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </DialogDescription>
              </div>

              {/* Organizer Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground text-lg">Organizer</h3>
                <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={event.creator_id.profile_picture_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {event.creator_id.first_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {event.creator_id.first_name} {event.creator_id.last_name}
                    </p>
                    <p className="text-muted-foreground text-sm">Event Organizer</p>
                  </div>
                </div>
              </div>

              {/* Participants Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Participants ({event.participants.length}{event.participant_limit ? ` / ${event.participant_limit}` : ''})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.participants.slice(0, 18).map((p) => (
                    <Avatar key={p._id} className="h-10 w-10 border-2 border-background">
                      <AvatarImage src={p.profile_picture_url} />
                      <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                        {p.first_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {event.participants.length > 18 && (
                    <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-muted-foreground text-xs font-semibold">+{event.participants.length - 18}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isCreator && (
              <div className="sticky bottom-0 z-20 bg-background/80 backdrop-blur-sm border-t border-border p-4 mt-4">
                <DialogFooter className="sm:justify-end gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Event
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the event
                          and all of its data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={deleteEventMutation.isPending}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {deleteEventMutation.isPending ? "Deleting..." : "Confirm Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit Event
                  </Button>
                </DialogFooter>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};