import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { publicEnv } from "./env";

interface BaseSession {
  name: string;
  email: string;
  picture?: string;
}

interface BuyerSession extends BaseSession {
  role: "buyer";
}

interface OwnerSession extends BaseSession {
  role: "owner";
}

export type AuthSession = BuyerSession | OwnerSession;

interface LoginResult {
  success: boolean;
  error?: "invalid_google";
  session?: AuthSession;
}

interface AuthContextType {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isOwner: boolean;
  isBuyer: boolean;
  loginWithGoogle: (credential: string) => LoginResult;
  logout: () => void;
}

interface GoogleJwtPayload {
  aud?: string;
  email?: string;
  email_verified?: boolean;
  exp?: number;
  iss?: string;
  name?: string;
  picture?: string;
}

const STORAGE_KEY = "panz-auto-auth";
const OWNER_EMAILS = new Set(
  (publicEnv.VITE_OWNER_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);
const GOOGLE_CLIENT_ID = publicEnv.VITE_GOOGLE_CLIENT_ID?.trim();
const GOOGLE_ISSUERS = new Set(["accounts.google.com", "https://accounts.google.com"]);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

function decodeGoogleJwt(credential: string): GoogleJwtPayload | null {
  try {
    const payload = credential.split(".")[1];
    if (!payload) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payload)) as GoogleJwtPayload;
  } catch {
    return null;
  }
}

function isBuyerSession(value: unknown): value is BuyerSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<BuyerSession>;
  return session.role === "buyer" && typeof session.name === "string" && typeof session.email === "string";
}

function isOwnerEmail(email: string): boolean {
  return OWNER_EMAILS.has(email.trim().toLowerCase());
}

function createSessionFromGoogleCredential(credential: string): AuthSession | null {
  const decoded = decodeGoogleJwt(credential);
  if (!decoded?.email) {
    return null;
  }

  if (decoded.email_verified === false) {
    return null;
  }

  if (decoded.exp !== undefined && decoded.exp * 1000 <= Date.now()) {
    return null;
  }

  if (decoded.iss && !GOOGLE_ISSUERS.has(decoded.iss)) {
    return null;
  }

  if (GOOGLE_CLIENT_ID && decoded.aud && decoded.aud !== GOOGLE_CLIENT_ID) {
    return null;
  }

  const email = decoded.email.trim().toLowerCase();
  const baseSession = {
    name: decoded.name?.trim() || email,
    email,
    picture: decoded.picture,
  };

  return isOwnerEmail(email)
    ? { role: "owner", ...baseSession }
    : { role: "buyer", ...baseSession };
}

const getStoredSession = (): AuthSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (isBuyerSession(parsed)) {
      return parsed;
    }
  } catch {
    // Ignore invalid persisted state.
  }

  window.localStorage.removeItem(STORAGE_KEY);
  return null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(getStoredSession);

  const persist = useCallback((nextSession: AuthSession) => {
    setSession(nextSession);
    if (typeof window === "undefined") {
      return;
    }

    // Only buyer sessions are restored from storage. Owner access must come
    // from a fresh Google sign-in so localStorage edits cannot reopen the dashboard.
    if (nextSession.role === "buyer") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const loginWithGoogle = useCallback((credential: string): LoginResult => {
    const nextSession = createSessionFromGoogleCredential(credential);
    if (!nextSession) {
      return { success: false, error: "invalid_google" };
    }

    persist(nextSession);
    return { success: true, session: nextSession };
  }, [persist]);

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
    loginWithGoogle,
    logout,
  }), [session, loginWithGoogle, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
