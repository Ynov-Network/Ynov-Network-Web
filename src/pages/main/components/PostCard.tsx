import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Flag,
  UserMinus,
  Link,
  Copy
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { useAuth } from "@/contexts/AuthContext";

interface Post {
  id: string;
  author: {
    username: string;
    fullName: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
}

interface PostCardProps {
  post: Post;
}

const user = {
  id: '1',
  username: 'student.ynov',
  email: "example@gmail.com",
  fullName: 'Student Ynov',
  avatar: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face`,
  bio: 'Computer Science student at Ynov Campus Maroc',
  followersCount: 142,
  followingCount: 89
};

const PostCard = ({ post }: PostCardProps) => {
  // const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Emma Wilson",
      content: "This looks amazing! Great work 👏",
      timestamp: "2h ago",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      author: "David Kim",
      content: "Love the design approach you took here",
      timestamp: "1h ago",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: user?.fullName || "You",
        content: newComment,
        timestamp: "now",
        avatar: user?.avatar || ""
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm py-6">
      <CardContent>
        {/* Post Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.fullName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.author.fullName}</p>
              <p className="text-xs text-muted-foreground">@{post.author.username} • {post.timestamp}</p>
            </div>
          </div>

          {/* Three Dots Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-xs p-0" align="end">
              <div className="py-2">
                <Button variant="ghost" className="w-full justify-start px-4 py-2">
                  <Copy className="h-4 w-4 mr-3" />
                  Copy link
                </Button>
                <Button variant="ghost" className="w-full justify-start px-4 py-2">
                  <Link className="h-4 w-4 mr-3" />
                  Share via...
                </Button>
                {post.author.username !== user?.username && (
                  <>
                    <Button variant="ghost" className="w-full justify-start px-4 py-2">
                      <UserMinus className="h-4 w-4 mr-3" />
                      Unfollow @{post.author.username}
                    </Button>
                    <div className="border-t my-2"></div>
                    <Button variant="ghost" className="w-full justify-start px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Flag className="h-4 w-4 mr-3" />
                      Report post
                    </Button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-secondary text-sm leading-relaxed mb-3">{post.content}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="rounded-lg overflow-hidden mb-4">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex space-x-4">
            <span>{likeCount} likes</span>
            <span>{comments.length} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`hover-scale ${liked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
            >
              <Heart className={`h-5 w-5 mr-2 ${liked ? 'fill-current' : ''}`} />
              Like
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary hover-scale"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Comment
            </Button>

            <Button variant="ghost" size="sm" className="hover:text-brand-secondary hover-scale">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSaved(!saved)}
            className={`hover-scale ${saved ? 'text-primary' : 'hover:text-primary'}`}
          >
            <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t">
            {/* Existing Comments */}
            <div className="space-y-3 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm">{comment.author}</p>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Input */}
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.fullName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 min-h-[40px] resize-none"
                  rows={1}
                />
                <Button
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;