import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (el: HTMLElement, config: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

export function Login() {
  const { language } = useLanguage();
  const { isAuthenticated, isOwner, loginAsOwner, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const isId = language === "id";

  const [showAdmin, setShowAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const googleBtnRef = useRef<HTMLDivElement>(null);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={isOwner ? "/dashboard" : "/"} replace />;
  }

  // Render Google button
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleBtnRef.current) return;

    const tryRender = () => {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential?: string }) => {
          if (response.credential) {
            loginWithGoogle(response.credential);
            navigate("/", { replace: true });
          }
        },
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        width: 400,
      });
    };

    if (window.google) {
      tryRender();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          tryRender();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [loginWithGoogle, navigate]);

  const handleAdminSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError(isId ? "Username dan password wajib diisi." : "Username and password are required.");
      return;
    }
    const result = loginAsOwner(username.trim(), password.trim());
    if (!result.success) {
      setError(isId ? "Username atau password salah." : "Wrong username or password.");
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md border border-neutral-200 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-black">
          {isId ? "Masuk" : "Sign In"}
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          {isId ? "Masuk untuk melanjutkan belanja." : "Sign in to continue shopping."}
        </p>

        {/* Google Sign-In */}
        <div className="mt-6">
          {GOOGLE_CLIENT_ID ? (
            <div ref={googleBtnRef} className="flex justify-center" />
          ) : (
            <p className="text-center text-xs text-neutral-400">
              Google Sign-In belum dikonfigurasi.
            </p>
          )}
        </div>

        {/* Divider */}
        {showAdmin && (
          <>
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 border-t border-neutral-200" />
              <span className="text-xs text-neutral-400">ADMIN</span>
              <div className="flex-1 border-t border-neutral-200" />
            </div>

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="mb-1 block text-sm font-medium text-black">Username</label>
                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
                  className="w-full border border-neutral-300 px-3 py-2 text-sm text-black outline-none transition focus:border-black" autoComplete="username" />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-black">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                  className="w-full border border-neutral-300 px-3 py-2 text-sm text-black outline-none transition focus:border-black" autoComplete="current-password" />
              </div>
              {error && <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              <button type="submit" className="w-full bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
                {isId ? "Masuk" : "Sign In"}
              </button>
            </form>
          </>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-black">
            {isId ? "Kembali ke Beranda" : "Back to Home"}
          </Link>
          {!showAdmin && (
            <button type="button" onClick={() => setShowAdmin(true)} className="text-[11px] text-neutral-300 hover:text-neutral-500 transition-colors">
              Admin
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
