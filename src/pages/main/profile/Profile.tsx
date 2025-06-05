import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Link as LinkIcon,
  MoreHorizontal,
  MessageCircle,
  UserPlus,
  Settings
} from "lucide-react";
import { Link, useParams } from "react-router";
import PostCard from "../components/PostCard";
// import { useAuth } from "@/contexts/AuthContext";

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

const Profile = () => {
  const { username } = useParams();
  // const user = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = !username || username === user?.username;

  // Mock user data
  const profileUser = {
    id: "1",
    username: "student.ynov",
    fullName: "Student Ynov",
    bio: "Computer Science student at Ynov Campus Maroc 🎓 | Passionate about web development and AI | Building cool projects ✨",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=300&fit=crop",
    location: "Casablanca, Morocco",
    website: "https://portfolio.student.dev",
    joinedDate: "September 2023",
    followersCount: 142,
    followingCount: 89,
    postsCount: 24,
    verified: true
  };

  // Mock posts data
  const userPosts = [
    {
      id: "1",
      author: {
        username: profileUser.username,
        fullName: profileUser.fullName,
        avatar: profileUser.avatar
      },
      content: "Just deployed my first React application! The journey from zero to deployment was incredible. Thanks to all my classmates who helped me debug along the way 🚀",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
      likes: 45,
      comments: 12,
      shares: 8,
      timestamp: "1 day ago",
      tags: ["react", "webdev", "achievement"]
    },
    {
      id: "2",
      author: {
        username: profileUser.username,
        fullName: profileUser.fullName,
        avatar: profileUser.avatar
      },
      content: "Excited to start my internship at a local tech startup next month! Looking forward to applying everything I've learned at Ynov in a real-world setting.",
      likes: 67,
      comments: 23,
      shares: 15,
      timestamp: "3 days ago",
      tags: ["internship", "career", "excited"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 bg-gradient-ynov">
          <img
            src={profileUser.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="bg-white">
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profileUser.avatar} />
                  <AvatarFallback className="bg-gradient-ynov text-white text-2xl font-bold">
                    {profileUser.fullName[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">{profileUser.fullName}</h1>
                    {profileUser.verified && (
                      <Badge className="bg-ynov-primary text-white">Verified</Badge>
                    )}
                  </div>
                  <p className="text-gray-600">@{profileUser.username}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4 md:mt-0">
                {isOwnProfile ? (
                  <Link to="/settings">
                    <Button variant="outline" className="border-ynov-primary text-ynov-primary hover:bg-ynov-primary hover:text-white">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      className={`${isFollowing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gradient-ynov hover:opacity-90 text-white'}`}
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Bio and Details */}
            <div className="mt-6 space-y-4">
              <p className="text-gray-800 leading-relaxed max-w-2xl">{profileUser.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileUser.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href={profileUser.website} className="text-ynov-primary hover:underline">
                    portfolio.student.dev
                  </a>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {profileUser.joinedDate}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 text-sm">
                <div className="flex space-x-1">
                  <span className="font-semibold">{profileUser.followingCount}</span>
                  <span className="text-gray-600">Following</span>
                </div>
                <div className="flex space-x-1">
                  <span className="font-semibold">{profileUser.followersCount}</span>
                  <span className="text-gray-600">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white border-t border-gray-200">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full rounded-none border-b bg-transparent h-auto p-0">
              <TabsTrigger
                value="posts"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ynov-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ynov-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ynov-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Likes
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="posts" className="space-y-6 mt-0">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="media" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="aspect-square bg-gray-100 rounded-lg hover:opacity-80 transition-opacity cursor-pointer">
                      <img
                        src={`https://images.unsplash.com/photo-${1581091226825 + item}?w=300&h=300&fit=crop`}
                        alt={`Media ${item}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="likes" className="mt-0">
                <div className="text-center py-12">
                  <p className="text-gray-500">Liked posts will appear here</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;