import { useMutation } from "@tanstack/react-query";
import * as commentsApi from "./api";

export function useCreateComment(postId: string) {
  return useMutation({
    mutationKey: ["createComment", postId],
    mutationFn: (data: commentsApi.CreateCommentRequest) => commentsApi.createComment(postId, data),
  });
}

export function useUpdateComment(commentId: string) {
  return useMutation({
    mutationKey: ["updateComment", commentId],
    mutationFn: (data: commentsApi.UpdateCommentRequest) => commentsApi.updateComment(commentId, data),
  });
}

export function useDeleteComment(commentId: string) {
  return useMutation({
    mutationKey: ["deleteComment", commentId],
    mutationFn: () => commentsApi.deleteComment(commentId),
  });
} 