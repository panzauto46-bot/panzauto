import { FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n";

export function Login() {
  const { language } = useLanguage();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fromPath = useMemo(() => {
    const state = location.state as { from?: string } | null;
    if (!state?.from || state.from === "/login") {
      return "/";
    }
    return state.from;
  }, [location.state]);

  if (isAuthenticated) {
    return <Navigate to={fromPath} replace />;
  }

  const isId = language === "id";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError(isId ? "Username dan password wajib diisi." : "Username and password are required.");
      return;
    }

    const result = login({ username: username.trim(), password: password.trim() });

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
          {isId
            ? "Masukkan username dan password kamu."
            : "Enter your username and password."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-black">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full border border-neutral-300 px-3 py-2 text-sm text-black outline-none transition focus:border-black"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-neutral-300 px-3 py-2 text-sm text-black outline-none transition focus:border-black"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            {isId ? "Masuk" : "Sign In"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-4 inline-flex text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-black"
        >
          {isId ? "Kembali ke Beranda" : "Back to Home"}
        </Link>
      </div>
    </section>
  );
}
