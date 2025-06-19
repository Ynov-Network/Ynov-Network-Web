import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/index/Index";
import SignIn from "./pages/auth/sign-in/SignIn";
import SignUp from "./pages/auth/sign-up/SignUp";
import Profile from "./pages/main/profile/Profile";
import Chat from "./pages/main/chat/Chat";
import Settings from "./pages/main/settings/Settings";
import Events from "./pages/main/events/Events";
import Groups from "./pages/main/groups/Groups";
import SavedPosts from "./pages/main/saved-posts/SavedPosts";
import Explore from "./pages/main/explore/Explore";
import Notifications from "./pages/main/notifications/Notifications";
import Feed from "./pages/main/feed/Feed";
import AppLayout from "./pages/main/MainLayout";
import AuthLayout from "./pages/auth/AuthLayout";
import ProtectedRoute from "./pages/protected-routes/ProtectedRoute";
import PostPage from "./pages/main/post/PostPage";
import ContactPage from "./pages/contact";
import Header from "./pages/auth/layout/header";
import Footer from "./pages/auth/layout/footer";

const queryClient = new QueryClient();

const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster richColors expand={true} />
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                {/* Protected routes with layout */}
                <Route path="/feed" element={<Feed />} />
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="/profile/:username?" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/events" element={<Events />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<SavedPosts />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;