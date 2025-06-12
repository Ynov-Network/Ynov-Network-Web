import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LayoutSidebar } from "./layout/LayoutSidebar";
import { LayoutHeader } from "./layout/LayoutHeader";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <LayoutSidebar variant="sidebar" />
      <SidebarInset>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <LayoutHeader />
          <main className="flex-1 bg-muted/30">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;