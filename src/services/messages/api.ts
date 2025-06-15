import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";

const conversationsClient = createServiceClient("conversations");

export interface Conversation {
    _id: string;
    type: 'one_to_one' | 'group';
    participants: UserProfile[];
    group_name?: string;
    last_message_timestamp: string;
    last_message?: Message;
    unread_count?: number;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    _id: string;
    conversation_id: string;
    sender_id: UserProfile;
    content: string;
    read_status: { [key: string]: boolean };
    createdAt: string;
    updatedAt: string;
}

export interface CreateConversationRequest {
    recipientIds: string[];
    type: 'one_to_one' | 'group';
    groupName?: string;
}

export interface SendMessageRequest {
    content: string;
}

export interface GetConversationsParams {
    page?: number;
    limit?: number;
}

export interface GetMessagesParams {
    page?: number;
    limit?: number;
}

export const getConversations = (params: GetConversationsParams) => {
    return conversationsClient.get<Conversation[]>("/", { params });
};

export const createConversation = (data: CreateConversationRequest) => {
    return conversationsClient.post<Conversation>("/", data);
};

export const getMessagesForConversation = (conversationId: string, params: GetMessagesParams) => {
    return conversationsClient.get<Message[]>(`/${conversationId}/messages`, { params });
};

export const sendMessage = (conversationId: string, data: SendMessageRequest) => {
    return conversationsClient.post<Message>(`/${conversationId}/messages`, data);
};

export interface MarkReadRequest {
    lastMessageId: string;
}

export const markMessagesAsRead = (conversationId: string, data: MarkReadRequest) => {
    return conversationsClient.put(`/${conversationId}/read`, data);
}; 