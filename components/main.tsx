// components/main.tsx
import Image from "next/image";
import Link from "next/link";
import { getproduks } from "@/lib/data";

export default async function Main() {
  const produks = await getproduks();

  // Kalau belum ada data produk
  if (!produks || produks.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 mt-10 text-center text-gray-500">
        Belum ada data produk. Admin perlu menambahkan produk di database.
      </div>
    );
  }

  // Kalau ada data produk
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-10 grid gap-8 md:grid-cols-3">
      {produks.map((produk) => (
        <article
          key={produk.id}
          className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col"
        >
          <div className="relative h-52 w-full">
            <Image
              src={produk.image}
              alt={produk.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {produk.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              {produk.description}
            </p>

            <div className="mt-auto flex items-center justify-between pt-3">
              <p className="text-base font-semibold text-[#A7744B]">
                Rp {produk.price.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-gray-500">
                Stok: {produk.capacity} pcs
              </p>
            </div>

            <Link
              href={`/produk/${produk.id}`}
              className="mt-4 inline-block text-center w-full px-4 py-2 rounded-sm bg-gray-900 text-white hover:bg-gray-800 text-sm transition"
            >
              Lihat Detail
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
