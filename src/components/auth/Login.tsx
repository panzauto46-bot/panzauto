import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n";
import { publicEnv } from "../../lib/env";

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

const GOOGLE_CLIENT_ID = publicEnv.VITE_GOOGLE_CLIENT_ID?.trim() ?? "";

export function Login() {
  const { language } = useLanguage();
  const { isAuthenticated, isOwner, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const isId = language === "id";

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
            const result = loginWithGoogle(response.credential);
            if (!result.success || !result.session) {
              setError(isId ? "Login Google tidak valid." : "Google sign-in could not be validated.");
              return;
            }

            setError("");
            navigate(result.session.role === "owner" ? "/dashboard" : "/", { replace: true });
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
  }, [isId, loginWithGoogle, navigate]);

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
              {isId ? "Google Sign-In belum dikonfigurasi." : "Google Sign-In is not configured yet."}
            </p>
          )}
        </div>

        <div className="mt-6 rounded border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
          <p className="font-medium text-black">
            {isId ? "Akses dashboard owner" : "Owner dashboard access"}
          </p>
          <p className="mt-1">
            {isId
              ? "Owner memakai Google Sign-In yang sama. Jika email Google kamu masuk allowlist owner, kamu akan langsung diarahkan ke dashboard."
              : "Owners use the same Google sign-in. If your Google email is in the owner allowlist, you will be redirected to the dashboard automatically."}
          </p>
        </div>

        {error && (
          <p className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-black">
            {isId ? "Kembali ke Beranda" : "Back to Home"}
          </Link>
        </div>
      </div>
    </section>
  );
}
