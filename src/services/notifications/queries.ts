import { useQuery } from "@tanstack/react-query";
import * as notificationsApi from "./api";

export function useGetNotifications(params: notificationsApi.GetNotificationsParams) {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => notificationsApi.getNotifications(params),
  });
} 