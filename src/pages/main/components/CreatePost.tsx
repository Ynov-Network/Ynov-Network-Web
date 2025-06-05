import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Image,
  Video,
  Smile,
  MapPin,
  Calendar,
  X
} from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
  // const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Please write something to share!");
      return;
    }

    // Mock post creation
    toast.success("Post shared successfully!");
    setContent("");
    setSelectedImage(null);
    setIsExpanded(false);
  };

  const handleImageSelect = () => {
    // Mock image selection
    setSelectedImage("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop");
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-ynov text-white font-semibold">
              {user?.fullName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="border-0 p-0 resize-none focus:ring-0 text-lg placeholder:text-gray-500 min-h-[60px]"
              rows={isExpanded ? 4 : 2}
            />

            {selectedImage && (
              <div className="relative mt-4 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {isExpanded && (
              <div className="mt-4 space-y-4">
                {/* Media Attachment Options */}
                <div className="flex items-center space-x-4 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-ynov-primary hover:text-ynov-primary hover:bg-ynov-primary/10"
                    onClick={handleImageSelect}
                  >
                    <Image className="h-5 w-5 mr-2" />
                    Photo
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-ynov-secondary hover:text-ynov-secondary hover:bg-ynov-secondary/10"
                  >
                    <Video className="h-5 w-5 mr-2" />
                    Video
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-ynov-accent hover:text-ynov-accent hover:bg-ynov-accent/10"
                  >
                    <Smile className="h-5 w-5 mr-2" />
                    Feeling
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-ynov-purple hover:text-ynov-purple hover:bg-ynov-purple/10"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Location
                  </Button>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Everyone can see this post</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent("");
                        setSelectedImage(null);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      size="sm"
                      className="bg-gradient-ynov hover:opacity-90 text-white hover-scale"
                      onClick={handleSubmit}
                      disabled={!content.trim()}
                    >
                      Share Post
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