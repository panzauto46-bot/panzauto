import { FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { useLanguage } from "../../lib/i18n";

const marketplaces = ["Shopee", "Tokopedia", "TikTok Shop", "Lazada", "Bukalapak"] as const;

export function Login() {
  const { language } = useLanguage();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sellerName, setSellerName] = useState("");
  const [marketplace, setMarketplace] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fromPath = useMemo(() => {
    const state = location.state as { from?: string } | null;
    if (!state?.from || state.from === "/login") {
      return "/dashboard";
    }
    return state.from;
  }, [location.state]);

  if (isAuthenticated) {
    return <Navigate to={fromPath} replace />;
  }

  const isId = language === "id";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSeller = sellerName.trim();
    if (!trimmedSeller || !marketplace || !password.trim()) {
      setError(
        isId
          ? "Seller, marketplace, dan password wajib diisi."
          : "Seller, marketplace, and password are required.",
      );
      return;
    }

    const result = login({
      sellerName: trimmedSeller,
      marketplace,
      password: password.trim(),
    });

    if (!result.success) {
      setError(
        isId
          ? "Password salah. Hubungi admin jika lupa password."
          : "Wrong password. Contact admin if you forgot your password.",
      );
      return;
    }

    navigate(fromPath, { replace: true });
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md border border-neutral-200 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          {isId ? "Akses Seller Dashboard" : "Seller Dashboard Access"}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-black">
          {isId ? "Masuk Sebagai Seller" : "Sign In as Seller"}
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          {isId
            ? "Masukkan akun seller dan password untuk mengakses dashboard."
            : "Enter your seller account and password to access dashboard."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="seller-name" className="mb-1 block text-sm font-medium text-black">
              {isId ? "Nama Seller" : "Seller Name"}
            </label>
            <input
              id="seller-name"
              type="text"
              value={sellerName}
              onChange={(event) => setSellerName(event.target.value)}
              placeholder={isId ? "Contoh: panzauto_official" : "Example: panzauto_official"}
              className="w-full border border-neutral-300 px-3 py-2 text-sm text-black outline-none transition focus:border-black"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="marketplace" className="mb-1 block text-sm font-medium text-black">
              Marketplace
            </label>
            <select
              id="marketplace"
              value={marketplace}
              onChange={(event) => setMarketplace(event.target.value)}
              className="w-full border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black"
            >
              <option value="">{isId ? "Pilih marketplace" : "Select marketplace"}</option>
              {marketplaces.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={isId ? "Masukkan password seller" : "Enter seller password"}
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
            {isId ? "Masuk ke Dashboard" : "Enter Dashboard"}
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
