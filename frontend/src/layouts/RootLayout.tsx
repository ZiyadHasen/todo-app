import DashboardImage from "@/assets/Image/dashboardcover.png";
import logo from "@/assets/Image/logo-2.svg";
import userIcon from "@/assets/Image/user.svg";
import ThemeModeToggle from "@/components/custom/modeToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";

import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export function RootLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMobile();

  // Close dropdown on outside click (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      )
        return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobile]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return null;
  const name = user?.name ?? "Guest";

  return (
    <>
      <nav className="bg-bg-default font-josefin sticky top-0 z-50 w-full">
        <div className="bg-bg-default relative flex h-[62px] items-center justify-between px-4 lg:px-12">
          <Link
            to="/app"
            className="text-text-accent flex items-center space-x-2"
          >
            <img src={logo} alt="Logo" />
            <span className="text-text-accent text-2xl lg:text-3xl">
              Your Notes
            </span>
          </Link>

          {/* make this  so dropdown anchors here */}
          <div className="relative flex items-center space-x-5 lg:space-x-10">
            <ThemeModeToggle />

            {/* isolate button+dropdown in its own relative box */}
            <div className="relative">
              <Button
                ref={buttonRef}
                onClick={() => setIsOpen((o) => !o)}
                variant="ghost"
                className="cursor-pointer p-0 hover:bg-transparent focus:ring-0 focus:outline-none"
              >
                <img src={userIcon} alt="User" className="block" />
              </Button>

              {/* dropdown will never push or shift anything else */}
              {isOpen && !isMobile && (
                <div
                  ref={dropdownRef}
                  className="bg-bg-card absolute top-16 right-0 z-50 mt-2 w-72 overflow-hidden rounded-lg shadow-lg"
                >
                  <h3 className="text-text-main px-4 pt-4 pb-2 text-center text-2xl font-medium">
                    Hello {name}
                  </h3>
                  <div className="space-y-4 p-3 text-xl">
                    <Button
                      asChild
                      variant="outline"
                      className="text-text-white bg-bg-secondary w-full cursor-pointer border-0 text-[15px] hover:bg-gray-500"
                    >
                      <Link to="/app/edit-profile">Modify User Info</Link>
                    </Button>
                    <Button
                      className="text-text-white bg-bg-accent w-full cursor-pointer border-0 text-[15px] hover:bg-[#AD5B95]"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-bg-default relative min-h-screen">
        {/* full‑width + natural height */}
        <img src={DashboardImage} alt="bg image" className="h-48 w-full" />

        {/* Mobile Modal */}
        <Dialog open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-text-accent text-center text-2xl font-medium">
                Hello {name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Link
                to="/app/edit-profile"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <Button
                  variant="outline"
                  className="bg-bg-secondary w-full text-white hover:bg-gray-500"
                >
                  Modify User Info
                </Button>
              </Link>

              <Button
                className="bg-bg-accent w-full text-white hover:bg-[#AD5B95]"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Centered content */}
        <div className="absolute inset-0 z-10 my-12 flex w-full justify-center">
          <Outlet />
        </div>
      </main>
    </>
  );
}
