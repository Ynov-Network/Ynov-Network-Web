import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Pencil,
  Trash2,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { type Post } from "@/services/posts/api";
import { type Comment } from "@/services/comments/api";
import { useToggleLike } from "@/services/like/mutation";
import { useToggleSavePost } from "@/services/saved-posts/mutation";
import { useGetMyProfile } from "@/services/users/queries";
import { useDeletePost, useUpdatePost } from "@/services/posts/mutation";
import { useCreateComment, useDeleteComment, useUpdateComment } from "@/services/comments/mutation";
import { useGetCommentsByPost } from "@/services/comments/queries";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const editPostSchema = z.object({
  content: z.string().min(1, "Post content cannot be empty."),
});

type EditPostFormValues = z.infer<typeof editPostSchema>;

interface EditPostDialogProps {
  post: Post;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const EditPostDialog = ({ post, isOpen, onOpenChange }: EditPostDialogProps) => {
  const queryClient = useQueryClient();
  const { mutate: updatePost, isPending } = useUpdatePost(post._id);

  const form = useForm<EditPostFormValues>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      content: post.content,
    },
  });

  const onSubmit = (values: EditPostFormValues) => {
    updatePost(values, {
      onSuccess: () => {
        toast.success("Post updated successfully");
        queryClient.invalidateQueries({ queryKey: ["feed"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        onOpenChange(false);
      },
      onError: (error: Error) => {
        toast.error(`Failed to update post: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Post"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [isSaved, setIsSaved] = useState(post.is_saved);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const queryClient = useQueryClient();

  const { data: profileData } = useGetMyProfile();
  const currentUser = profileData?.data;
  const isAuthor = currentUser?._id === post.author_id._id;

  const { mutate: deletePost } = useDeletePost(post._id);

  const toggleLikeMutation = useToggleLike(post._id);
  const toggleSaveMutation = useToggleSavePost(post._id);

  const handleDeletePost = () => {
    deletePost(undefined, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
        setDeleteDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["feed"] });
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete post: ${error.message}`);
      },
    });
  };

  const handleLike = () => {
    toggleLikeMutation.mutate(undefined, {
      onSuccess: () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      },
      onError: (error: Error) => {
        toast.error(`Something went wrong: ${error.message}`);
      }
    })
  };

  const handleSave = () => {
    toggleSaveMutation.mutate(undefined, {
      onSuccess: () => {
        setIsSaved(!isSaved);
      },
      onError: (error: Error) => {
        toast.error(`Something went wrong: ${error.message}`);
      }
    })
  };
  console.log(post)
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={post.author_id.profile_picture_url} />
              <AvatarFallback>
                {post.author_id.first_name[0]}
                {post.author_id.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/profile/${post.author_id.username}`}>
                <CardTitle className="hover:underline">
                  {post.author_id.first_name} {post.author_id.last_name}
                </CardTitle>
              </Link>
              <p className="text-sm text-muted-foreground">
                @{post.author_id.username} · {formatRelativeTime(post.createdAt)}
              </p>
            </div>
          </div>
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeleteDialogOpen(true)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 items-center">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={handleLike}>
                <Heart className={isLiked ? "text-red-500 fill-current" : ""} />
              </Button>
              <span className="text-sm text-muted-foreground">{likeCount}</span>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setShowComments(!showComments)}>
                <MessageCircle />
              </Button>
              <span className="text-sm text-muted-foreground">{post.comment_count}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Bookmark className={isSaved ? "text-primary fill-current" : ""} />
          </Button>
        </div>
        {showComments && <CommentsSection postId={post._id} postAuthorId={post.author_id._id} />}
      </CardContent>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditPostDialog
        post={post}
        isOpen={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </Card>
  );
};


const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty."),
});

type CommentFormValues = z.infer<typeof commentSchema>;

const CommentsSection = ({ postId, postAuthorId }: { postId: string, postAuthorId: string }) => {
  const { data: commentsData, isLoading } = useGetCommentsByPost(postId, {
    page: 1,
    limit: 100, // Or implement pagination
  });
  const comments = commentsData?.data.comments ?? [];
  const queryClient = useQueryClient();
  const { data: profileData } = useGetMyProfile();
  const currentUser = profileData?.data;

  const { mutate: createComment, isPending: isCreatingComment } = useCreateComment(postId);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: CommentFormValues) => {
    createComment(values, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        queryClient.invalidateQueries({ queryKey: ["feed"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error: Error) => {
        toast.error(`Failed to post comment: ${error.message}`);
      }
    });
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser?.profile_picture_url} />
            <AvatarFallback>{currentUser?.first_name[0]}</AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea placeholder="Add a comment..." {...field} rows={1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isCreatingComment}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Form>
      <div className="space-y-4">
        {isLoading && <p>Loading comments...</p>}
        {comments.map((comment: Comment) => (
          <CommentItem key={comment._id} comment={comment} postId={postId} postAuthorId={postAuthorId} />
        ))}
      </div>
    </div>
  )
}

const CommentItem = ({ comment, postId, postAuthorId }: { comment: Comment, postId: string, postAuthorId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: profileData } = useGetMyProfile();
  const currentUser = profileData?.data;
  const isAuthor = currentUser?._id === comment.author_id._id;
  const isPostAuthor = currentUser?._id === postAuthorId;

  const { mutate: updateComment, isPending: isUpdatingComment } = useUpdateComment(comment._id);
  const { mutate: deleteComment } = useDeleteComment(comment._id);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  const onUpdate = (values: CommentFormValues) => {
    updateComment(values, {
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      },
      onError: (error: Error) => {
        toast.error(`Failed to update comment: ${error.message}`);
      }
    })
  }

  const handleDelete = () => {
    deleteComment(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        queryClient.invalidateQueries({ queryKey: ["feed"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete comment: ${error.message}`);
      }
    })
  }

  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author_id.profile_picture_url} />
        <AvatarFallback>{comment.author_id.first_name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">{comment.author_id.first_name} {comment.author_id.last_name}</span>
            <span className="text-sm text-muted-foreground"> · {formatRelativeTime(comment.createdAt)}</span>
          </div>
          {(isAuthor || isPostAuthor) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {isAuthor &&
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                }
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onUpdate)} className="flex items-center gap-2 mt-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" size="sm" disabled={isUpdatingComment}>Save</Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
          </Form>
        ) : (
          <p className="text-sm">{comment.content}</p>
        )}
      </div>
    </div>
  )
}

export default PostCard;