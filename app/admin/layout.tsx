// app/admin/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    // pt-24 -> dorong konten ke bawah navbar yang fixed
    <div className="min-h-screen flex bg-gray-100 pt-24">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-semibold">Kaluna Admin</h1>
          <p className="text-xs text-gray-500">Dashboard manajemen</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <Link
            href="/admin"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Overview
          </Link>
          <Link
            href="/admin/products"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Produk / produk
          </Link>
          <Link
            href="/admin/orders"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Pesanan
          </Link>
          <Link
            href="/admin/custom-orders"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Custom Order
          </Link>
          <Link
            href="/admin/insight"
            className="block rounded-md px-3 py-2 hover:bg-gray-100"
          >
            Insight Penjualan
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <h2 className="text-lg font-medium">Admin Dashboard</h2>
        </header>

        <section className="p-6 flex-1">{children}</section>
      </main>
    </div>
  );
}
