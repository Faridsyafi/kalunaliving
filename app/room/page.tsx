import { getprodukById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default async function produkDetailPage({ params }: { params: { id: string } }) {
  const produk = await getprodukById(params.id);

  if (!produk) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 mt-10 text-center text-gray-500">
        Produk tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-10">
      <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-md shadow-sm">

        {/* Gambar Produk */}
        <div className="relative w-full h-80 md:h-full">
          <Image
            src={produk.image}
            alt={produk.name}
            fill
            className="object-cover rounded-md"
          />
        </div>

        {/* Detail Produk */}
        <div className="flex flex-col justify-center">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
            Detail Produk
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {produk.name}
          </h1>

          <p className="text-gray-600 mb-5">
            {produk.description}
          </p>

          {/* Harga & Stok */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Harga
              </p>
              <p className="text-lg font-semibold text-[#A7744B]">
                Rp {produk.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Stok
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {produk.capacity} pcs
              </p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <button className="w-full py-3 bg-[#A7744B] text-white font-semibold rounded-sm hover:bg-[#8f633f] transition mb-3">
            Tambah ke Keranjang
          </button>

          <Link
            href="/"
            className="block w-full text-center border border-gray-300 py-2 rounded-sm hover:bg-gray-50 transition"
          >
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}
