// src/contexts/AuthProvider.tsx
import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "@/types/types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchedOnce = useRef(false);

  /**
   * Fetches the current user once on mount (or until you reset fetchedOnce.current).
   */
  const refreshUser = useCallback(async () => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/get-user", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const { user: fetched } = await res.json();
      setUser(fetched);
    } catch (err) {
      console.error("refreshUser error:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Call on logout; clears server-side session and local state.
   */
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  /**
   * Merge in updated fields locally without a refetch.
   */
  const updateLocalUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  // Kick off the one‑time fetch
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
        refreshUser,
        updateLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
