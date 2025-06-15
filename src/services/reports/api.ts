import { createServiceClient } from "@/lib/axios";

const reportsClient = createServiceClient("reports");

export interface CreateReportRequest {
  reported_entity_type: 'Post' | 'Comment' | 'User';
  reported_entity_id: string;
  reason: string;
}

export const createReport = (data: CreateReportRequest) => {
  return reportsClient.post<{ message: string }>("/", data);
}; 