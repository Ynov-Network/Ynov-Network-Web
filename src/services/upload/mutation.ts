import { useMutation } from "@tanstack/react-query";
import * as uploadApi from "./api";

export function useUploadMedia() {
  return useMutation({
    mutationFn: (file: File) => uploadApi.uploadMedia(file),
  });
} 