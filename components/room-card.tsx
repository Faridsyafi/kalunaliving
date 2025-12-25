import Image from "next/image";

export default function produkCard({ produk }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative w-full h-56">
        <Image
          src={produk.image}
          alt={produk.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold">{produk.name}</h3>
        <p className="text-gray-500 text-sm mt-1">Kapasitas: {produk.capacity}</p>
        <p className="text-gray-700 font-semibold mt-1">
          Rp {produk.price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
