import { useState, useEffect, ReactNode } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { User } from "@/types/types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/get-user", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // NEW: login and immediately refresh context
  const login = async (email: string, password: string) => {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    // cookie’s set by server, now fetch user payload
    await refreshUser();
  };

  const logout = async () => {
    try {
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const ctxValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};
