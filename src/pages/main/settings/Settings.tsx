import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Bell,
  Shield,
  Eye,
  Moon,
  Globe,
  Camera
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
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

const Settings = () => {
  // const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    posts: false
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <header className="bg-background border-b border-border px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.fullName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold">{user?.fullName}</h2>
                    <p className="text-muted-foreground">@{user?.username}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">Change Picture</Button>
                <Button variant="ghost" className="w-full mt-2">Remove Picture</Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Profile Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="text-lg">{user?.fullName?.[0]}</AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          className="absolute -bottom-1 -right-1 rounded-full p-2 bg-primary hover:bg-primary/90"
                        >
                          <Camera className="h-3 w-3" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user?.fullName}</h3>
                        <p className="text-gray-600">@{user?.username}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue={user?.fullName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue={user?.username} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" defaultValue={user?.bio} placeholder="Tell us about yourself..." />
                    </div>

                    <Button className="bg-primary hover:bg-primary/90">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          <p className="text-sm text-gray-600">
                            Get notified when someone {key === 'likes' ? 'likes your posts' :
                              key === 'comments' ? 'comments on your posts' :
                                key === 'follows' ? 'follows you' :
                                  key === 'messages' ? 'sends you a message' :
                                    'mentions you in a post'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotifications(prev => ({ ...prev, [key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Privacy Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Private Account</p>
                        <p className="text-sm text-gray-600">Only followers can see your posts</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Online Status</p>
                        <p className="text-sm text-gray-600">Let others see when you're online</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Message Requests</p>
                        <p className="text-sm text-gray-600">Receive messages from people you don't follow</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>Appearance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Moon className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-600">Switch to dark theme</p>
                        </div>
                      </div>
                      <Switch checked={theme === 'dark'} onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Language</p>
                          <p className="text-sm text-gray-600">Choose your preferred language</p>
                        </div>
                      </div>
                      <select className="border border-gray-200 rounded-md px-3 py-1 text-sm">
                        <option>English</option>
                        <option>Français</option>
                        <option>العربية</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;