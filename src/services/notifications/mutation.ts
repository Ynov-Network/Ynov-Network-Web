import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as notificationsApi from "./api";

export function useMarkAsRead() {
    return useMutation({
        mutationFn: (notificationId: string) => notificationsApi.markAsRead(notificationId),
    });
}

export function useMarkAllAsRead() {
    return useMutation({
        mutationKey: ["markAllAsRead"],
        mutationFn: () => notificationsApi.markAllAsRead(),
    });
}

export function useDeleteNotification() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (notificationId: string) => notificationsApi.deleteNotification(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
}