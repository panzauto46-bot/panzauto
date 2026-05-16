import { Star } from "lucide-react";
import { useLanguage } from "../../lib/i18n";

const reviews = [
  {
    id: 1,
    name: "Budi Santoso",
    location: "Jakarta",
    product: "Custom Velo Street",
    rating: 5,
    date: "2024-03-15",
    comment: "Velocity stack-nya mantap! Tarikan motor jadi lebih enteng di RPM menengah. Finishing anodize birunya juga keren banget.",
    commentEn: "The velocity stack is awesome! The bike pulls better in mid-range RPM. The blue anodize finish looks really cool too.",
  },
  {
    id: 2,
    name: "Ahmad Rizky",
    location: "Bandung",
    product: "Custom Velo Touring",
    rating: 5,
    date: "2024-03-10",
    comment: "Pasang di NMAX 155, hasilnya luar biasa. Torsi bawah jadi lebih kuat buat riding harian. Recommended seller!",
    commentEn: "Installed on NMAX 155, the result is amazing. Low-end torque is stronger for daily riding. Highly recommended seller!",
  },
  {
    id: 3,
    name: "Dewi Lestari",
    location: "Surabaya",
    product: "Custom Velo Standard",
    rating: 4,
    date: "2024-03-05",
    comment: "Produk sesuai deskripsi, kualitas bagus. Pengiriman cepat dan packing aman. Bakal order lagi buat motor lain.",
    commentEn: "Product matches description, good quality. Fast shipping and safe packaging. Will order again for another bike.",
  },
  {
    id: 4,
    name: "Rian Pratama",
    location: "Yogyakarta",
    product: "Custom Velo Pro",
    rating: 5,
    date: "2024-02-28",
    comment: "Sumpah ini gila! Pasang di ZX-25R, performa naik drastis. Torsi bawah-menengah nendang banget. Worth every rupiah!",
    commentEn: "This is insane! Installed on ZX-25R, performance increased drastically. Low-mid torque hits hard. Worth every rupiah!",
  },
  {
    id: 5,
    name: "Feri Kurniawan",
    location: "Semarang",
    product: "Custom Velo Street",
    rating: 4,
    date: "2024-02-20",
    comment: "Kualitas oke, harga terjangkau. Respon seller juga cepat pas mau konsultasi ukuran. Thanks Panz Auto!",
    commentEn: "Quality is good, affordable price. Seller response is also fast when consulting about size. Thanks Panz Auto!",
  },
  {
    id: 6,
    name: "Siti Nurhaliza",
    location: "Medan",
    product: "Custom Velo Touring",
    rating: 5,
    date: "2024-02-15",
    comment: "Awalnya ragu, tapi ternyata hasilnya memuaskan. Motor jadi lebih halus tarikannya. Sukses terus Panz Auto!",
    commentEn: "Was skeptical at first, but the result is satisfying. The bike pulls smoother. Keep it up Panz Auto!",
  },
];

export function Reviews() {
  const { t, language } = useLanguage();
  const isId = language === "id";

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section id="reviews" className="bg-neutral-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            {isId ? "Apa Kata Pelanggan" : "What Our Customers Say"}
          </h2>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg">
            {isId
              ? "Ulasan jujur dari pelanggan yang sudah menggunakan produk kami"
              : "Honest reviews from customers who have used our products"}
          </p>
        </div>

        <div className="mb-12 flex items-center justify-center gap-8 rounded-lg border border-neutral-200 bg-white p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-2xl font-bold text-black">{averageRating.toFixed(1)}</p>
            <p className="text-sm text-neutral-600">
              {isId ? "dari" : "out of"} 5
            </p>
          </div>
          <div className="h-12 w-px bg-neutral-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-black">{reviews.length}</p>
            <p className="text-sm text-neutral-600">
              {isId ? "ulasan" : "reviews"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-lg border border-neutral-200 bg-white p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-500">
                  {new Date(review.date).toLocaleDateString(
                    isId ? "id-ID" : "en-US",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </span>
              </div>

              <p className="mb-4 text-sm text-neutral-700">
                {isId ? review.comment : review.commentEn}
              </p>

              <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                <div>
                  <p className="font-medium text-black">{review.name}</p>
                  <p className="text-xs text-neutral-500">{review.location}</p>
                </div>
                <span className="text-xs font-medium text-neutral-600">
                  {review.product}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/6285718336173"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            {isId ? "Tulis Ulasan" : "Write a Review"}
          </a>
        </div>
      </div>
    </section>
  );
}
