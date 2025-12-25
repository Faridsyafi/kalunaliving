// app/admin/page.tsx

import { getproduks } from "@/lib/data";
import Link from "next/link";

export default async function AdminPage() {
  const produks = await getproduks();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Daftar Produk</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Nama Produk</th>
              <th className="px-4 py-2 text-left">Harga</th>
              <th className="px-4 py-2 text-left">Dibuat</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produks.map((produk: any, index: number) => (
              <tr key={produk.id ?? index} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{produk.name}</td>
                <td className="px-4 py-2">{produk.price}</td>
                <td className="px-4 py-2">
                  {produk.createdAt
                    ? new Date(produk.createdAt).toLocaleString()
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  {/* Sesuaikan link / aksi sesuai kebutuhanmu */}
                  <Link
                    href={`/admin/produks/${produk.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}

            {produks.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Belum ada data Produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
