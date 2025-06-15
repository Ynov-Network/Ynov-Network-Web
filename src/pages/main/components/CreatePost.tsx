import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Image,
  Video,
  Smile,
  MapPin,
  X
} from "lucide-react";
import { toast } from "sonner";
import { useCreatePost } from "@/services/posts/mutation";
import { useUploadMedia } from "@/services/upload/mutation";
import { useQueryClient } from "@tanstack/react-query";

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

const CreatePost = () => {
  const queryClient = useQueryClient();
  const createPostMutation = useCreatePost();
  const uploadMediaMutation = useUploadMedia();
  // const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [media, setMedia] = useState<{ id: string, url: string, type: 'image' | 'video' }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractHashtags = (text: string): string[] => {
    const regex = /#(\w+)/g;
    const matches = text.match(regex);
    if (matches) {
      return matches.map(match => match.substring(1));
    }
    return [];
  };

  const handleSubmit = async () => {
    if (!content.trim() && media.length === 0) {
      toast.error("Please write something or add media to share!");
      return;
    }

    const hashtags = extractHashtags(content);

    await createPostMutation.mutateAsync({
      content,
      hashtags,
      media_items: media.map((m, i) => ({ media_id: m.id, display_order: i })),
      visibility: 'public'
    }, {
      onSuccess: () => {
        toast.success("Post shared successfully!");
        setContent("");
        setMedia([]);
        setIsExpanded(false);
        queryClient.invalidateQueries({ queryKey: ['feed'] });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['userFeed'] });
        queryClient.invalidateQueries({ queryKey: ['publicFeed'] });
      },
      onError: (error: Error) => {
        toast.error(`Failed to share post: ${error.message}`);
      }
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const response = await uploadMediaMutation.mutateAsync(file);
      const mediaData = response.data.media;
      const newMedia = {
        id: mediaData._id,
        url: mediaData.cdn_url,
        type: mediaData.file_type.startsWith('image') ? 'image' : 'video' as 'image' | 'video'
      };
      setMedia([...media, newMedia]);
      if (!isExpanded) {
        setIsExpanded(true);
      }
    } catch (error) {
      toast.error("Failed to upload media.");
      console.error(error);
    }
  };

  const handleRemoveMedia = (id: string) => {
    setMedia(media.filter(m => m.id !== id));
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent>
        <div className="flex space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-brand text-white font-semibold">
              {user?.fullName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="p-4 resize-none focus:ring-0 text-lg placeholder:text-muted-foreground min-h-[60px]"
              rows={isExpanded ? 4 : 2}
            />

            {media.length > 0 && (
              <div className="relative mt-4 rounded-lg overflow-hidden grid grid-cols-2 gap-2">
                {media.map(m => (
                  <div key={m.id} className="relative">
                    {m.type === 'image' ? (
                      <img
                        src={m.url}
                        alt="Selected"
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <video
                        src={m.url}
                        controls
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 p-1 h-6 w-6"
                      onClick={() => handleRemoveMedia(m.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,video/*"
            />

            {isExpanded && (
              <div className="space-y-4 my-2">
                {/* Media Attachment Options */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="h-5 w-5 mr-2" />
                    Photo
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand-secondary hover:text-brand-secondary hover:bg-brand-secondary/10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Video className="h-5 w-5 mr-2" />
                    Video
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand-accent hover:text-brand-accent hover:bg-brand-accent/10"
                  >
                    <Smile className="h-5 w-5 mr-2" />
                    Feeling
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand-purple hover:text-brand-purple hover:bg-brand-purple/10"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Location
                  </Button>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="h-4 w-4" />
                    <span>Everyone can see this post</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent("");
                        setMedia([]);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      className="bg-gradient-brand hover:opacity-90 text-white hover-scale"
                      onClick={handleSubmit}
                      disabled={createPostMutation.isPending || uploadMediaMutation.isPending || (!content.trim() && media.length === 0)}
                    // loading={createPostMutation.isPending || uploadMediaMutation.isPending}
                    >
                      {createPostMutation.isPending || uploadMediaMutation.isPending ? "Sharing..." : "Share Post"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;