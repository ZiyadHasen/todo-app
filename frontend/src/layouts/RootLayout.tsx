import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";

export default function RootLayout() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div>
      <nav className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between">
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
          className="p-2 bg-blue-500 text-white rounded"
        >
          Toggle Theme
        </button>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
