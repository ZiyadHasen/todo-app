// src/contexts/AuthContext.tsx
import { createContext, useContext } from "react";
import { User } from "@/types/types";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateLocalUser: (updates: Partial<User>) => void;
};

// We’ll throw if someone tries to use the context outside a provider.
const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  loading: true,
  logout: async () => {
    throw new Error("AuthContext.logout(): no provider found");
  },
  refreshUser: async () => {
    throw new Error("AuthContext.refreshUser(): no provider found");
  },
  updateLocalUser: () => {
    throw new Error("AuthContext.updateLocalUser(): no provider found");
  },
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

// Convenient hook for consumers
export function useAuth() {
  return useContext(AuthContext);
}
