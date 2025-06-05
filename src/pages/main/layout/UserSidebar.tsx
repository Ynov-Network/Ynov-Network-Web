import { Button } from "@/components/ui/button";
import {
  Home,
  Search,
  Bell,
  MessageCircle,
  Bookmark,
  User,
  Settings,
  Users,
  Calendar
} from "lucide-react";
import { Link, useLocation } from "react-router";
import LogoHeader from "@/assets/ynov_logo_black.webp"
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

const UserSidebar = () => {
  // const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/feed" },
    { icon: Search, label: "Explore", path: "/explore" },
    { icon: Bell, label: "Notifications", path: "/notifications", badge: 3 },
    { icon: MessageCircle, label: "Messages", path: "/chat", badge: 2 },
    { icon: Bookmark, label: "Saved", path: "/saved" },
    { icon: Users, label: "Groups", path: "/groups" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: User, label: "Profile", path: `/profile/${user?.username}` },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* University Logo Section */}
      <div className="border-b border-gray-100">
        <div className="flex items-center justify-center space-x-3">
          <img height={150} width={150} src={LogoHeader} alt="YNetwork_Logo" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start relative transition-colors duration-200 ${isActive
                  ? "bg-ynov-primary hover:bg-ynov-primary/90 text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default UserSidebar;