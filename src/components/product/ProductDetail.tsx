import { ArrowLeft, MessageCircle, ShoppingCart, Share2, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../lib/cart";
import { useLanguage } from "../../lib/i18n";
import { useProducts } from "../../lib/products";
import { ProductDetailSkeleton } from "../Skeleton";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, openCart } = useCart();
  const { t, formatCurrency, language } = useLanguage();
  const { products } = useProducts();
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setActiveImage(null);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const product = products.find((p) => p.id === Number(id));
  const isId = language === "id";

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" role="alert">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
          <Link to="/" className="text-black underline focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      title: isId ? product.nameId : product.name,
      make: "Custom",
      model: product.name,
      year: "2024",
      color: isId ? product.finishId : product.finish,
      throttleBody: "Standar / OEM",
      throttleBodySize: product.diameter,
      velocityStackHeight: product.height,
      price: product.priceIdr,
    });
    openCart();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: isId ? product.descriptionId : product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const waNumber = "6285718336173";
  const waMessage = encodeURIComponent(
    isId
      ? `Halo Panz Auto, saya ingin bertanya tentang ${product.nameId}`
      : `Hello Panz Auto, I would like to ask about ${product.name}`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const displayImage = activeImage || product.img;
  const allImages = [product.img, ...(product.gallery || [])].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-black hover:text-neutral-600 mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{isId ? "Kembali ke Beranda" : "Back to Home"}</span>
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden bg-neutral-100 rounded-lg">
              <img src={displayImage} alt={isId ? product.nameId : product.name} className="h-full w-full object-cover" loading="eager" />
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square w-full overflow-hidden rounded-md border-2 transition-all ${
                      displayImage === img ? "border-black" : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <img src={img} alt={`${product.name} gallery image ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-black sm:text-4xl mb-4">{isId ? product.nameId : product.name}</h1>
            </div>

            <p className="text-base text-neutral-600">{isId ? product.descriptionId : product.description}</p>

            <div className="space-y-4 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="font-semibold text-black">{isId ? "Spesifikasi" : "Specifications"}</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Diameter:</dt>
                  <dd className="font-medium text-black">{product.diameter}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-600">{isId ? "Tinggi" : "Height"}:</dt>
                  <dd className="font-medium text-black">{product.height}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-600">{isId ? "Finishing" : "Finish"}:</dt>
                  <dd className="font-medium text-black">{isId ? product.finishId : product.finish}</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-black">{isId ? "Fitur" : "Features"}</h3>
              <ul className="space-y-2">
                {(isId ? product.featuresId : product.features).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-neutral-600">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-black">{isId ? "Kompatibel dengan" : "Compatible with"}</h3>
              <div className="flex flex-wrap gap-2">
                {product.compatible.map((model) => (
                  <span key={model} className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-black">
                    {model}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={handleAddToCart} className="flex-1 inline-flex items-center justify-center gap-2 bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded">
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                <span>{isId ? "Tambah ke Keranjang" : "Add to Cart"}</span>
              </button>
              <button type="button" onClick={handleShare} className="inline-flex items-center justify-center gap-2 border border-neutral-300 px-4 py-3 text-black hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded" aria-label={isId ? "Bagikan produk ini" : "Share this product"}>
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </button>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-neutral-300 px-4 py-3 text-black hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded" aria-label={isId ? "Hubungi via WhatsApp" : "Contact via WhatsApp"}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
