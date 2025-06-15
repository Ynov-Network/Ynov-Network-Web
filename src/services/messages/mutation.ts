import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as messagesApi from "./api";

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: messagesApi.CreateConversationRequest) => messagesApi.createConversation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: messagesApi.SendMessageRequest) => messagesApi.sendMessage(conversationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useMarkMessagesAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, lastMessageId }: { conversationId: string; lastMessageId: string }) =>
      messagesApi.markMessagesAsRead(conversationId, { lastMessageId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
} 