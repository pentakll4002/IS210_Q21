import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("sneaksurf_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("sneaksurf_users") || "[]");
    const found = users.find((u: any) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem("sneaksurf_user", JSON.stringify(found));
      return true;
    }
    // Demo: allow any login
    const demoUser: User = { id: Date.now().toString(), name: email.split("@")[0], email };
    setUser(demoUser);
    localStorage.setItem("sneaksurf_user", JSON.stringify(demoUser));
    return true;
  };

  const register = (name: string, email: string, _password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("sneaksurf_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    const newUser: User = { id: Date.now().toString(), name, email };
    users.push(newUser);
    localStorage.setItem("sneaksurf_users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("sneaksurf_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sneaksurf_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("sneaksurf_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
