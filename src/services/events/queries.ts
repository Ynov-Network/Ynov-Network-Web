import { useQuery } from "@tanstack/react-query";
import * as eventsApi from "./api";

export function useGetAllEvents(params: eventsApi.GetEventsParams) {
  return useQuery({
    queryKey: ["events", { params }],
    queryFn: () => eventsApi.getAllEvents(params),
  });
}

export function useGetEventById(eventId: string) {
  return useQuery({
    queryKey: ["event", { eventId }],
    queryFn: () => eventsApi.getEventById(eventId),
    enabled: !!eventId,
  });
}
