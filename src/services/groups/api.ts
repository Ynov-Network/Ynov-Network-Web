import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";

const groupsClient = createServiceClient("groups");

export interface Group {
  _id: string;
  name: string;
  description: string;
  topic: 'Web Development' | 'AI' | 'CyberSecurity' | 'Data Analytics' | 'Games Development';
  creator_id: UserProfile;
  members: UserProfile[];
  conversation_id: string;
  is_public: boolean;
  cover_image_url?: string;
  createdAt: string;
  updatedAt: string;
  post_count: number;
  is_admin: boolean;
  is_member: boolean;
}

export interface PagedGroupsResponse {
  groups: Group[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface CreateGroupRequest {
  name: string;
  description: string;
  topic: 'Web Development' | 'AI' | 'CyberSecurity' | 'Data Analytics' | 'Games Development';
  is_public?: boolean;
  cover_image_url?: string;
}

export interface UpdateGroupRequest {
  description?: string;
  is_public?: boolean;
  cover_image_url?: string;
}

export interface GetGroupsParams {
  page?: number;
  limit?: number;
  topic?: 'Web Development' | 'AI' | 'CyberSecurity' | 'Data Analytics' | 'Games Development';
  q?: string;
}

export const createGroup = (data: CreateGroupRequest) => {
  return groupsClient.post<Group>("/", data);
};

export const getAllGroups = (params: GetGroupsParams) => {
  return groupsClient.get<PagedGroupsResponse>("/", { params });
};

export const getGroupById = (groupId: string) => {
  return groupsClient.get<Group>(`/${groupId}`);
};

export const updateGroup = (groupId: string, data: UpdateGroupRequest) => {
  return groupsClient.put<Group>(`/${groupId}`, data);
};

export const deleteGroup = (groupId: string) => {
  return groupsClient.delete<{ message: string }>(`/${groupId}`);
};

export const joinGroup = (groupId: string) => {
  return groupsClient.post<{ message: string, group: Group }>(`/${groupId}/join`);
};

export const leaveGroup = (groupId: string) => {
  return groupsClient.delete<{ message: string, group: Group }>(`/${groupId}/leave`);
}; 