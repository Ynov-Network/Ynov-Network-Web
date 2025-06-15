import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";

const eventsClient = createServiceClient("events");

export interface Event {
  _id: string;
  title: string;
  description: string;
  event_type: 'Workshop' | 'Competition' | 'Bootcamp' | 'Seminar' | 'Social';
  creator_id: UserProfile;
  start_date: string;
  end_date: string;
  location: string;
  participants: UserProfile[];
  participant_limit?: number;
  cover_image_url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PagedEventsResponse {
  events: Event[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  event_type: 'Workshop' | 'Competition' | 'Bootcamp' | 'Seminar' | 'Social';
  start_date: string;
  end_date: string;
  location: string;
  participant_limit?: number;
  cover_image_url?: string;
}

export type UpdateEventRequest = Partial<CreateEventRequest>;

export interface GetEventsParams {
  page?: number;
  limit?: number;
  event_type?: 'Workshop' | 'Competition' | 'Bootcamp' | 'Seminar' | 'Social';
  sortBy?: 'start_date' | 'createdAt';
  q?: string;
}

export const createEvent = (data: CreateEventRequest) => {
  return eventsClient.post<Event>("/", data);
};

export const getAllEvents = (params: GetEventsParams) => {
  return eventsClient.get<PagedEventsResponse>("/", { params });
};

export const getEventById = (eventId: string) => {
  return eventsClient.get<Event>(`/${eventId}`);
};

export const updateEvent = (eventId: string, data: UpdateEventRequest) => {
  return eventsClient.put<Event>(`/${eventId}`, data);
};

export const deleteEvent = (eventId: string) => {
  return eventsClient.delete<{ message: string }>(`/${eventId}`);
};

export const joinEvent = (eventId: string) => {
  return eventsClient.post<{ message: string, event: Event }>(`/${eventId}/join`);
};

export const leaveEvent = (eventId: string) => {
  return eventsClient.delete<{ message: string, event: Event }>(`/${eventId}/leave`);
}; 