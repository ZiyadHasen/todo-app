// src/layouts/RootLayout.tsx
"use client";
import image from "@/assets/Image/bigcover.png";
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
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function RootLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMobile();

  // close dropdown on outside click (desktop only)
  useEffect(() => {
    if (isMobile) return;
    function handler(e: MouseEvent) {
      if (
        dropdownRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      )
        return;
      setIsOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobile]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const name = user?.name ?? "User";
  console.log(user?.name);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white">
        <div className="flex h-[62px] items-center justify-between px-6 lg:px-12">
          <Link
            to="/app"
            className="flex items-center space-x-2 text-[#D375B9]"
          >
            <img src={logo} alt="Logo" />
            <span className="text-3xl">Your Notes</span>
          </Link>

          <div className="flex items-center space-x-5 lg:space-x-10">
            <ModeToggle />
            <Button
              ref={buttonRef}
              onClick={() => setIsOpen((o) => !o)}
              variant="ghost"
            >
              <img src={userIcon} alt="User" />
            </Button>
          </div>
        </div>
      </nav>

      <main
        className="relative z-20 flex min-h-screen w-full justify-center overflow-x-hidden bg-cover bg-center md:items-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Desktop Dropdown */}
        {!isMobile && isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-0 right-2 z-10 mt-2 w-64 overflow-hidden rounded-lg bg-white shadow-lg"
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

        <div className="absolute inset-0 bg-black/10" />
        <Outlet />
      </main>
    </>
  );
}
