import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../lib/i18n";

export function NotFound() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const isId = language === "id";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-black mb-2">404</h1>
          <p className="text-xl text-neutral-600">
            {isId ? "Halaman tidak ditemukan" : "Page not found"}
          </p>
        </div>

        <p className="text-neutral-600 mb-8">
          {isId
            ? "Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan."
            : "Sorry, the page you're looking for cannot be found or has been moved."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>{isId ? "Beranda" : "Home"}</span>
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 border border-neutral-300 px-6 py-3 font-medium text-black hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{isId ? "Kembali" : "Go Back"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
