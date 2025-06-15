import { useQuery } from "@tanstack/react-query";
import * as messagesApi from "./api";

export function useGetConversationsForUser(params: messagesApi.GetConversationsParams) {
  return useQuery({
    queryKey: ["conversations", params],
    queryFn: () => messagesApi.getConversations(params),
  });
}

export function useGetMessagesForConversation(conversationId: string, params: messagesApi.GetMessagesParams) {
  return useQuery({
    queryKey: ["messages", conversationId, params],
    queryFn: () => messagesApi.getMessagesForConversation(conversationId, params),
    enabled: !!conversationId,
  });
} 