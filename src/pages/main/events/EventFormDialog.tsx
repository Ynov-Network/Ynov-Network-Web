import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateEvent, useUpdateEvent } from "@/services/events/mutation";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import type { CreateEventRequest, Event } from "@/services/events/api";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(2000),
  event_type: z.enum(['Workshop', 'Competition', 'Bootcamp', 'Seminar', 'Social']),
  start_date: z.date({ required_error: "Start date is required." }),
  end_date: z.date({ required_error: "End date is required." }),
  location: z.string().min(3, "Location is required.").max(200),
  participant_limit: z.coerce.number().int().positive().optional(),
  cover_image_url: z.string().url().optional().or(z.literal('')),
}).refine(data => data.end_date > data.start_date, {
  message: "End date must be after start date.",
  path: ["end_date"],
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormDialogProps {
  event?: Event | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export const EventFormDialog = ({ event, isOpen, onOpenChange, children }: EventFormDialogProps) => {
  const queryClient = useQueryClient();
  const isEditMode = !!event;
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    mode: "onSubmit",
    defaultValues: isEditMode && event ? {
      ...event,
      start_date: new Date(event.start_date),
      end_date: new Date(event.end_date),
    } : {
      title: "",
      description: "",
      location: "",
      cover_image_url: "",
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && event) {
        form.reset({
          ...event,
          start_date: new Date(event.start_date),
          end_date: new Date(event.end_date),
        });
      } else {
        form.reset({
          title: "",
          description: "",
          event_type: undefined,
          location: "",
          participant_limit: undefined,
          cover_image_url: "",
          start_date: undefined,
          end_date: undefined,
        });
      }
    }
  }, [event, isEditMode, form, isOpen]);


  const onSubmit = async (values: EventFormValues) => {
    const payload: CreateEventRequest & { _id?: string } = {
      ...values,
      start_date: values.start_date.toISOString(),
      end_date: values.end_date.toISOString(),
    };

    if (!payload.cover_image_url) {
      delete payload.cover_image_url;
    }
    if (payload.participant_limit === 0) {
      delete payload.participant_limit;
    }

    if (isEditMode && event) {
      return updateEventMutation.mutateAsync({ eventId: event._id, data: payload }, {
        onSuccess: () => {
          toast.success("Event updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["events"] });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(`Failed to update event: ${error.message}`);
        },
      });
    } else {
      return createEventMutation.mutateAsync(payload, {
        onSuccess: () => {
          toast.success("Event created successfully!");
          queryClient.invalidateQueries({ queryKey: ["event", { eventId: payload._id }] });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(`Failed to create event: ${error.message}`);
        },
      });
    }
  };

  const mutation = isEditMode ? updateEventMutation : createEventMutation;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Event" : "Create a new event"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the details of your event below." : "Organize something amazing for the community. Fill out the details below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] max-w-full overflow-y-auto px-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Competition">Competition</SelectItem>
                      <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Ynov Campus, Room 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participant_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participant Limit (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 20" {...field} onChange={event => field.onChange(+event.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending
                  ? (isEditMode ? "Saving..." : "Creating...")
                  : (isEditMode ? "Save Changes" : "Create Event")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}; 