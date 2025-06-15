import { createServiceClient } from "@/lib/axios";

const uploadClient = createServiceClient("upload", {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export interface Media {
  _id: string;
  uploader_id: string;
  file_path: string;
  cdn_url: string;
  file_type: string;
  file_name: string;
  file_size: number;
  createdAt: string;
  updatedAt: string;
}

export const uploadMedia = (file: File) => {
  const formData = new FormData();
  formData.append("media", file);

  return uploadClient.post<{ message: string, media: Media }>("/", formData);
}; 