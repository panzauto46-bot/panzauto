import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface AuthSession {
  sellerName: string;
  marketplace: string;
}

interface LoginPayload {
  sellerName: string;
  marketplace: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => LoginResult;
  logout: () => void;
}

const STORAGE_KEY = "panz-auto-auth";

/**
 * Seller PIN / password.
 * Ganti PIN ini sesuai keinginan kamu.
 * Hanya yang tahu PIN ini yang bisa masuk ke Seller Dashboard.
 */
const SELLER_PIN = "panzauto2024";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredSession = (): AuthSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AuthSession>;
    if (
      typeof parsed.sellerName === "string" &&
      parsed.sellerName.trim() &&
      typeof parsed.marketplace === "string" &&
      parsed.marketplace.trim()
    ) {
      return {
        sellerName: parsed.sellerName.trim(),
        marketplace: parsed.marketplace.trim(),
      };
    }
  } catch {
    // Ignore invalid data.
  }

  return null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(getStoredSession);

  const login = ({ sellerName, marketplace, password }: LoginPayload): LoginResult => {
    if (password !== SELLER_PIN) {
      return { success: false, error: "password_wrong" };
    }

    const nextSession = {
      sellerName: sellerName.trim(),
      marketplace: marketplace.trim(),
    };
    setSession(nextSession);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    }
    return { success: true };
  };

  const logout = () => {
    setSession(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: session !== null,
      login,
      logout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
