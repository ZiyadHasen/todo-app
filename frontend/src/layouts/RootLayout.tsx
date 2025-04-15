import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";
import image from "@/assets/Image/bigcover.png";

export default function RootLayout() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen">
      <nav className="flex justify-between bg-gray-200 p-4 dark:bg-gray-800">
        <div>
          <Link to="/">Login</Link>
          <Link to="/register" className="ml-4">
            Register
          </Link>
          <Link to="/app" className="ml-4">
            Home
          </Link>
          <Link to="/app/edit-profile" className="ml-4">
            Edit Profile
          </Link>
        </div>
        <button
          onClick={toggleTheme}
          className="rounded bg-blue-500 p-2 text-white"
        >
          Toggle Theme
        </button>
      </nav>
      <main
        className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-cover bg-center md:items-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <Outlet />
      </main>
    </div>
  );
}
