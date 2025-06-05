import { SidebarProvider } from "@/components/ui/sidebar";
import UserSidebar from "./layout/UserSidebar";
import AppHeader from "./layout/AppHeader";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex w-full">
        <UserSidebar />

        <div className="flex-1 flex flex-col">
          <AppHeader />

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;