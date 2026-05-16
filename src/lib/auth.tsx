import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

// --- Session Types ---

interface BuyerSession {
  role: "buyer";
  name: string;
  email: string;
  picture?: string;
}

interface OwnerSession {
  role: "owner";
  name: string;
}

export type AuthSession = BuyerSession | OwnerSession;

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isOwner: boolean;
  isBuyer: boolean;
  loginAsOwner: (username: string, password: string) => LoginResult;
  loginWithGoogle: (credential: string) => void;
  logout: () => void;
}

const STORAGE_KEY = "panz-auto-auth";
const OWNER_USERNAME = "panzauto46";
const OWNER_PASSWORD = "Pandudarma14";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeGoogleJwt(credential: string): { name: string; email: string; picture?: string } {
  try {
    const payload = credential.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return {
      name: (decoded.name as string) || (decoded.email as string) || "User",
      email: (decoded.email as string) || "",
      picture: decoded.picture as string | undefined,
    };
  } catch {
    return { name: "User", email: "" };
  }
}

const getStoredSession = (): AuthSession | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (parsed.role === "owner" || parsed.role === "buyer") return parsed;
  } catch {
    // Ignore.
  }
  return null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(getStoredSession);

  const persist = (s: AuthSession) => {
    setSession(s);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    }
  };

  const loginAsOwner = useCallback((username: string, password: string): LoginResult => {
    if (username !== OWNER_USERNAME || password !== OWNER_PASSWORD) {
      return { success: false, error: "invalid" };
    }
    persist({ role: "owner", name: OWNER_USERNAME });
    return { success: true };
  }, []);

  const loginWithGoogle = useCallback((credential: string) => {
    const info = decodeGoogleJwt(credential);
    persist({ role: "buyer", name: info.name, email: info.email, picture: info.picture });
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo(() => ({
    session,
    isAuthenticated: session !== null,
    isOwner: session?.role === "owner",
    isBuyer: session?.role === "buyer",
    loginAsOwner,
    loginWithGoogle,
    logout,
  }), [session, loginAsOwner, loginWithGoogle, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
