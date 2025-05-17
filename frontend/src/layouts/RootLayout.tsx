import DashboardImage from "@/assets/Image/dashboardcover.png";
import logo from "@/assets/Image/logo-2.svg";
import userIcon from "@/assets/Image/user.svg";
import { ModeToggle } from "@/components/custom/modeToggle";
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
      <nav className="sticky top-0 z-50 w-full bg-white dark:bg-black">
        <div className="flex h-[62px] items-center justify-between px-6 lg:px-12">
          <Link
            to="/app"
            className="flex items-center space-x-2 text-[#D375B9]"
          >
            <img src={logo} alt="Logo" />
            <span className="text-3xl">Your Notes</span>
          </Link>

          {/* make this relative so dropdown anchors here */}
          <div className="relative flex items-center space-x-5 lg:space-x-10">
            <ModeToggle />

            <Button
              ref={buttonRef}
              onClick={() => setIsOpen((o) => !o)}
              variant="ghost"
              className="cursor-pointer"
            >
              <img src={userIcon} alt="User" />
            </Button>

            {/* Desktop dropdown – fixed under nav */}
            {!isMobile && isOpen && (
              <div
                ref={dropdownRef}
                className="fixed top-[70px] right-4 z-50 w-64 overflow-hidden rounded-lg bg-white shadow-lg"
              >
                <h3 className="px-4 pt-4 pb-2 text-center text-xl text-[#D375B9]">
                  Hi {name}
                </h3>
                <div className="space-y-2 p-3 text-xl">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-0 bg-[#7C8495] text-[15px] text-white hover:bg-gray-500"
                  >
                    <Link to="/app/edit-profile">Modify User Info</Link>
                  </Button>
                  <Button
                    className="w-full border-0 bg-[#D375B9] text-[15px] text-white hover:bg-[#AD5B95]"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="relative min-h-screen dark:bg-black">
        {/* full‑width + natural height */}
        <img src={DashboardImage} alt="bg image" className="h-auto w-full" />

        {/* Mobile Modal */}
        <Dialog open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-[#D375B9]">
                Hi {name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                asChild
                variant="outline"
                className="w-full bg-[#7C8495] text-white hover:bg-gray-500"
              >
                <Link to="/app/edit-profile">Modify User Info</Link>
              </Button>
              <Button
                className="w-full bg-[#D375B9] text-white hover:bg-[#AD5B95]"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Centered content */}
        <div className="absolute inset-0 z-10 flex w-full justify-center">
          <Outlet />
        </div>
      </main>
    </>
  );
}
