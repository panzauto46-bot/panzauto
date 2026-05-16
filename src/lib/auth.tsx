import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface AuthSession {
  sellerName: string;
  marketplace: string;
}

interface LoginPayload {
  username: string;
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
 * Kredensial seller — hanya pemilik toko yang tahu.
 */
const SELLER_USERNAME = "panzauto46";
const SELLER_PASSWORD = "Pandudarma14";

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

  const login = ({ username, password }: LoginPayload): LoginResult => {
    if (username !== SELLER_USERNAME) {
      return { success: false, error: "username_wrong" };
    }
    if (password !== SELLER_PASSWORD) {
      return { success: false, error: "password_wrong" };
    }

    const nextSession: AuthSession = {
      sellerName: SELLER_USERNAME,
      marketplace: "Panz Auto",
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
