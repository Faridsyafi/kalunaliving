// app/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import Main from "@/components/main";
import HomeSkeleton from "@/components/skeletons/home-skeleton";

const accent = "bg-[#A7744B]";
const accentHover = "hover:bg-[#8f613e]";
const accentText = "text-[#A7744B]";
const accentBorder = "border-[#A7744B]";
const accentBg50 = "hover:bg-[#A7744B]/5";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <Hero />

      {/* ABOUT / BRAND EXPLANATION */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-md shadow p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Tentang Kaluna
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-3">
              Handcrafted Home Living Goods &amp; Custom Tableware
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Kami menghadirkan koleksi keramik dan wooden tableware yang dibuat
              manual oleh artisan lokal. Website ini menyatukan identitas brand,
              proses custom, hingga pembayaran digital.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/about"
                className={`px-6 py-3 text-white rounded-sm transition ${accent} ${accentHover}`}
              >
                Pelajari Kami
              </Link>
              <Link
                href="/order"
                className={`px-6 py-3 rounded-sm transition border ${accentBorder} ${accentText} ${accentBg50}`}
              >
                Ajukan Custom Order
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-md shadow p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Kenapa beralih ke Kaluna?
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Identitas brand penuh &amp; katalog eksklusif.</li>
              <li>✔ Payment gateway aman dan tercatat digital.</li>
              <li>✔ Layanan custom produk dengan konsultasi artisan.</li>
              <li>✔ Insight penjualan untuk Admin dan Owner.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCT / produkS SECTION */}
      <section className="py-16 border-t border-gray-200">
        <div className="text-center max-w-screen-md mx-auto px-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Katalog Unggulan
          </p>
          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            Produk Kaluna Living
          </h2>
          <p className="py-3 text-gray-600">
            Temukan koleksi keramik siap pakai atau kombinasikan dengan layanan
            custom kami.
          </p>
        </div>

        <Suspense fallback={<HomeSkeleton />}>
          <Main />
        </Suspense>

        <div className="text-center mt-8">
          <Link
            href="/product"
            className="px-8 py-3 bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </section>

      {/* CUSTOM ORDER SECTION */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Custom Order
            </p>
            <h2 className="text-3xl font-semibold text-gray-900 mt-3">
              Punya desain keramik sendiri?
            </h2>
            <p className="mt-4 text-gray-600">
              Unggah inspirasi warna, motif, atau bentuk yang kamu inginkan.
              Tim artisan kami siap berdiskusi untuk menghasilkan tableware
              unik hanya untukmu.
            </p>
            <Link
              href="/order"
              className={`inline-block mt-6 px-6 py-3 text-white rounded-sm transition ${accent} ${accentHover}`}
            >
              Ajukan Desain Sekarang
            </Link>
          </div>

          <div className="bg-white rounded-md shadow p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Alur Custom Produk
            </h3>
            <ol className="space-y-3 text-gray-600 list-decimal list-inside">
              <li>Isi form custom &amp; unggah referensi desain.</li>
              <li>Admin meninjau, memberi estimasi harga dan timeline.</li>
              <li>
                Owner mengonfirmasi produksi, pembayaran tercatat digital.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* SIGNIN / CTA SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="bg-gray-900 rounded-md p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                Siap mengelola purchase order &amp; custom product secara
                profesional?
              </h2>
              <p className="text-gray-300 mt-3">
                Login dengan akun Google untuk mengakses katalog, custom order,
                serta riwayat transaksi Anda.
              </p>
            </div>
            <Link
              href="/signin"
              className={`px-8 py-3 text-white rounded-sm transition ${accent} ${accentHover}`}
            >
              Masuk / Daftar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
