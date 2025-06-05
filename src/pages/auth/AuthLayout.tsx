import { Outlet } from "react-router";
import { DecorativePanel } from "./layout/DecorativePanel";
import { ThemeToggle } from "./layout/ThemeToggle";

export default function AuthLayout() {

  return (
    <div className="min-h-screen flex">
      <ThemeToggle />

      {/* Left side - Authentication Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Right side - Decorative Panel */}
      <div className="hidden lg:block lg:flex-1">
        <DecorativePanel />
      </div>
    </div>
  );
}