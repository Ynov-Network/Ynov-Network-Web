import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Bell,
  Shield,
  Eye,
  Moon,
  Camera
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useGetMyProfile } from "@/services/users/queries";
import { useUpdateUserProfile, useUpdateProfilePicture, useUpdatePrivacySettings, useUpdateNotificationSettings } from "@/services/users/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { PhoneInput } from "@/components/phone-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { TwoFactorDialog } from "./two-factor/TwoFactorDialog";
import { VerifyTotpDialog } from "./two-factor/VerifyTotpDialog";
import type { UpdateUserRequest } from "@/services/users/api";

const profileSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  phone_number: z.string().optional(),
  bio: z.string().max(160, "Bio cannot exceed 160 characters.").optional(),
});

const privacySchema = z.object({
  account_privacy: z.enum(['public', 'private', 'followers_only']),
  show_online_status: z.boolean(),
  allow_message_requests: z.enum(['everyone', 'following', 'none']),
});

const notificationsSchema = z.object({
  likes: z.boolean(),
  comments: z.boolean(),
  follows: z.boolean(),
  messages: z.boolean(),
  posts: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PrivacyFormValues = z.infer<typeof privacySchema>;
type NotificationsFormValues = z.infer<typeof notificationsSchema>;

const Settings = () => {
  const { data: myProfileData, isLoading } = useGetMyProfile();
  const user = myProfileData?.data;

  const { theme, setTheme } = useTheme();
  const [isTwoFactorDialogOpen, setIsTwoFactorDialogOpen] = useState(false);
  const [isVerifyTotpDialogOpen, setIsVerifyTotpDialogOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<Partial<ProfileFormValues> | null>(null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      bio: "",
      phone_number: "",
    }
  });

  const privacyForm = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      account_privacy: 'public',
      show_online_status: true,
      allow_message_requests: 'everyone',
    }
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      likes: true,
      comments: true,
      follows: true,
      messages: true,
      posts: false,
    }
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      profileForm.reset({
        fullName: `${user.first_name} ${user.last_name}`,
        username: user.username,
        email: user.university_email,
        bio: user.bio,
        phone_number: user.phone_number
      });
      privacyForm.reset({
        account_privacy: user.account_privacy,
        show_online_status: user.show_online_status,
        allow_message_requests: user.allow_message_requests,
      });
      notificationsForm.reset(user.notification_settings);
    }
  }, [user, profileForm, privacyForm, notificationsForm]);

  const updateUserMutation = useUpdateUserProfile();
  const updateProfilePictureMutation = useUpdateProfilePicture();
  const updatePrivacySettingsMutation = useUpdatePrivacySettings();
  const updateNotificationSettingsMutation = useUpdateNotificationSettings();

  const handleUpdateProfile = (data: Partial<ProfileFormValues>) => {
    const [firstName, ...lastNameParts] = (data.fullName || "").split(" ");
    const lastName = lastNameParts.join(" ");

    const updateData: UpdateUserRequest = {};
    if (data.fullName) {
      updateData.first_name = firstName;
      updateData.last_name = lastName;
    }
    if (data.username) updateData.username = data.username;
    if (data.bio) updateData.bio = data.bio;
    if (data.phone_number) updateData.phone_number = data.phone_number;

    updateUserMutation.mutate(updateData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      },
      onError: (error) => {
        toast.error(`Failed to update profile: ${error.message}`);
      }
    });
  }

  const onProfileSubmit = (data: ProfileFormValues) => {
    const changedFields: Partial<ProfileFormValues> = {};
    let needs2fa = false;

    if (data.fullName !== `${user?.first_name} ${user?.last_name}`) changedFields.fullName = data.fullName;
    if (data.username !== user?.username) changedFields.username = data.username;
    if (data.bio !== user?.bio) changedFields.bio = data.bio;
    if (data.phone_number !== user?.phone_number) {
      changedFields.phone_number = data.phone_number;
      if (user?.phone_number && user?.two_factor_enabled) {
        needs2fa = true;
      }
    }

    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes to save.");
      return;
    }

    if (needs2fa) {
      setPendingUpdate(changedFields);
      setIsVerifyTotpDialogOpen(true);
    } else {
      handleUpdateProfile(changedFields);
    }
  };

  const onTotpVerificationSuccess = () => {
    if (pendingUpdate) {
      handleUpdateProfile(pendingUpdate);
      setPendingUpdate(null);
    }
  };

  const onPrivacySubmit = (data: PrivacyFormValues) => {
    updatePrivacySettingsMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Privacy settings updated successfully!");
        queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      },
      onError: (error) => {
        toast.error(`Failed to update settings: ${error.message}`);
      }
    });
  };

  const onNotificationsSubmit = (data: NotificationsFormValues) => {
    updateNotificationSettingsMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Notification settings updated successfully!");
        queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      },
      onError: (error) => {
        toast.error(`Failed to update settings: ${error.message}`);
      }
    });
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateProfilePictureMutation.mutate(file, {
        onSuccess: () => {
          toast.success("Profile picture updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["user", "me"] });
        },
        onError: (error) => {
          toast.error(`Failed to update picture: ${error.message}`);
        }
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-6 px-6">
        <header className="bg-background border-b border-border p-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </header>

        <div>
          <div>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
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
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="flex items-center space-x-6">
                          <div className="relative">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={user?.profile_picture_url} />
                              <AvatarFallback className="text-lg">{user?.first_name?.[0]}</AvatarFallback>
                            </Avatar>
                            <input type="file" id="picture-upload" className="hidden" onChange={handlePictureChange} accept="image/*" />
                            <label htmlFor="picture-upload">
                              <Button
                                size="sm"
                                className="absolute -bottom-1 -right-1 rounded-full p-2 bg-primary hover:bg-primary/90"
                                asChild
                                type="button"
                                onClick={() => document.getElementById('picture-upload')?.click()}
                              >
                                <span><Camera className="h-3 w-3" /></span>
                              </Button>
                            </label>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{user?.first_name} {user?.last_name}</h3>
                            <p className="text-muted-foreground">@{user?.username}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl><Input type="email" {...field} disabled /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="phone_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone number</FormLabel>
                              <FormControl>
                                <PhoneInput
                                  className="w-full"
                                  defaultCountry={"MA"}
                                  international={true}
                                  placeholder="Enter a phone number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl><Input placeholder="Tell us about yourself..." {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={!profileForm.formState.isDirty || updateUserMutation.isPending}>
                          {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </Form>
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
                  <CardContent>
                    <Form {...notificationsForm}>
                      <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                        {Object.keys(notificationsForm.getValues()).map((key) => (
                          <FormField
                            key={key}
                            control={notificationsForm.control}
                            name={key as keyof NotificationsFormValues}
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between">
                                <div>
                                  <FormLabel className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Get notified when someone {key === 'likes' ? 'likes your posts' :
                                      key === 'comments' ? 'comments on your posts' :
                                        key === 'follows' ? 'follows you' :
                                          key === 'messages' ? 'sends you a message' :
                                            'mentions you in a post'}
                                  </p>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={!notificationsForm.formState.isDirty || updateNotificationSettingsMutation.isPending}>
                          {updateNotificationSettingsMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </Form>
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
                  <CardContent>
                    <Form {...privacyForm}>
                      <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-6">
                        <FormField
                          control={privacyForm.control}
                          name="account_privacy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Account Privacy</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select account privacy" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="public">Public</SelectItem>
                                  <SelectItem value="private">Private</SelectItem>
                                  <SelectItem value="followers_only">Followers Only</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-sm text-muted-foreground">Control who can see your profile and posts.</p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={privacyForm.control}
                          name="show_online_status"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <FormLabel className="font-medium">Show Online Status</FormLabel>
                                <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={privacyForm.control}
                          name="allow_message_requests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Allow Message Requests From</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select who can message you" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="everyone">Everyone</SelectItem>
                                  <SelectItem value="following">People you follow</SelectItem>
                                  <SelectItem value="none">No one</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-sm text-muted-foreground">Choose who is allowed to send you message requests.</p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={!privacyForm.formState.isDirty || updatePrivacySettingsMutation.isPending}>
                          {updatePrivacySettingsMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Two-Factor Authentication</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.two_factor_enabled ? "2FA is currently enabled." : "Add an extra layer of security to your account."}
                        </p>
                      </div>
                      <Button onClick={() => setIsTwoFactorDialogOpen(true)}>
                        {user?.two_factor_enabled ? "Disable 2FA" : "Enable 2FA"}
                      </Button>
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
                          <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                        </div>
                      </div>
                      <Switch checked={theme === 'dark'} onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <TwoFactorDialog
        isOpen={isTwoFactorDialogOpen}
        onOpenChange={setIsTwoFactorDialogOpen}
        isEnabled={user?.two_factor_enabled ?? false}
      />
      <VerifyTotpDialog
        isOpen={isVerifyTotpDialogOpen}
        onOpenChange={setIsVerifyTotpDialogOpen}
        onSuccess={onTotpVerificationSuccess}
      />
    </div>
  );
};

export default Settings;