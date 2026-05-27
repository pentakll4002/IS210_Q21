import { createContext, useContext, useState, ReactNode } from "react";
import { authService, type NguoiDung } from "@/services/auth";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, captcha: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapUser(nd: NguoiDung): User {
  return {
    id: nd.maNguoiDung,
    name: nd.tenND,
    email: nd.email,
    phone: nd.soDienThoai ?? undefined,
    address: nd.diaChi ?? undefined,
    role: nd.vaiTro?.toUpperCase(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("sneaksurf_user");
    if (!saved) return null;
    try {
      const nd = JSON.parse(saved);
      // Support both old format {id,name,email} and new API format {maNguoiDung,...}
      if (nd.maNguoiDung) return mapUser(nd);
      return nd;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { nguoiDung } = await authService.login(email, password);
      const u = mapUser(nguoiDung);
      setUser(u);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    captcha: string,
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const { nguoiDung } = await authService.register(name, email, password, captcha);
      const u = mapUser(nguoiDung);
      setUser(u);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const nd = await authService.updateProfile({
        tenND: data.name,
        soDienThoai: data.phone,
        diaChi: data.address,
      });
      const u = mapUser(nd);
      setUser(u);
    } catch (err) {
      console.error("Update profile failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
