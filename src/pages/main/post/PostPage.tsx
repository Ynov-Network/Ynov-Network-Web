import { useParams } from "react-router";
import { useGetPostById } from "@/services/posts/queries";
import { PostCardSkeleton } from "../components/PostCardSkeleton";
import PostCard from "../components/PostCard";

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: postData, isLoading, isError } = useGetPostById(postId ?? "");

  if (!postId) {
    return <div>Post not found</div>;
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <PostCardSkeleton />
      </div>
    );
  }

  if (isError || !postData?.data) {
    return <div>Error loading post or post not found.</div>;
  }

  return (
    <div className="p-4">
      <PostCard post={postData.data} />
    </div>
  );
};

export default PostPage; 