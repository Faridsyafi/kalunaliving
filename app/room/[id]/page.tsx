// app/produk/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getprodukById } from "@/lib/data";

interface produkPageProps {
  params: { id: string };
}

export default async function produkDetailPage({ params }: produkPageProps) {
  const produk = await getprodukById(params.id);

  if (!produk) {
    return notFound();
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-10 md:py-16 grid gap-10 md:grid-cols-[2fr,1.3fr]">
        {/* Gambar utama */}
        <div className="bg-white rounded-md shadow overflow-hidden">
          <div className="relative w-full h-80 md:h-[420px]">
            <Image
              src={produk.image}
              alt={produk.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Detail / info */}
        <div className="bg-white rounded-md shadow p-6 md:p-8 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            produk Detail
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            {produk.name}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {produk.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-600">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Harga
              </p>
              <p className="text-lg font-semibold text-[#A7744B]">
                Rp {produk.price.toLocaleString("id-ID")}{" "}
                <span className="text-xs text-gray-500">/ malam</span>
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Kapasitas
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {produk.capacity} orang
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/checkout?produkId=${produk.id}`}
              className="w-full text-center px-6 py-3 rounded-sm bg-[#A7744B] text-white font-semibold hover:bg-[#8f613e] transition"
            >
              Pesan Sekarang
            </Link>

            <Link
              href="/"
              className="w-full text-center px-6 py-3 rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
