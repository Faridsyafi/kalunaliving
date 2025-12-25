// app/admin/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type ProdukItem = {
  id: string;
  name: string;
  price: number;
  capacity: number;
  image: string;
  description: string;
  createdAt: string;
};

export default function AdminProductsPage() {
  const [produks, setProduks] = useState<ProdukItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Ambil data produk saat halaman load
  useEffect(() => {
    const fetchProduks = async () => {
      try {
        const res = await fetch("/api/admin/produks");

        if (!res.ok) {
          throw new Error("Gagal mengambil data produk");
        }

        const text = await res.text();
        let data: unknown = [];

        try {
          data = text ? JSON.parse(text) : [];
        } catch {
          console.error("Response GET /api/admin/produks bukan JSON valid:", text);
          throw new Error("Response server tidak valid (bukan JSON)");
        }

        if (Array.isArray(data)) {
          setProduks(data as ProdukItem[]);
        } else {
          throw new Error("Format data produk tidak sesuai");
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Terjadi kesalahan saat mengambil produk");
        }
      }
    };

    fetchProduks();
  }, []);

  // Submit form tambah produk
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/admin/produks", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let data: unknown = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        console.error(
          "Response POST /api/admin/produks bukan JSON valid:",
          text
        );
      }

      if (!res.ok) {
        const message =
          data &&
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as any).message === "string"
            ? (data as any).message
            : "Gagal menyimpan produk";
        throw new Error(message);
      }

      if (data && typeof data === "object") {
        setProduks((prev) => [data as ProdukItem, ...prev]);
      }

      form.reset();
      setSuccess("Produk berhasil disimpan.");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan saat menyimpan produk");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin - Produk</h1>

      {/* Alert */}
      {error && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-300 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-emerald-50 text-emerald-700 border border-emerald-300 px-4 py-2 rounded text-sm">
          {success}
        </div>
      )}

      {/* FORM TAMBAH PRODUK */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Nama Produk</label>
            <input
              name="name"
              type="text"
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Harga (Rupiah)
            </label>
            <input
              name="price"
              type="number"
              min={0}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Kapasitas</label>
            <input
              name="capacity"
              type="number"
              min={1}
              defaultValue={1}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Gambar (file)
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Deskripsi</label>
          <textarea
            name="description"
            rows={3}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-60"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>

      {/* DAFTAR PRODUK */}
      <h2 className="text-lg font-semibold mb-2">Daftar Produk</h2>

      {produks.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada produk.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {produks.map((produk) => {
            const imageSrc = produk.image.startsWith("/")
              ? produk.image
              : `/${produk.image}`;

            return (
              <Link
                key={produk.id}
                href={`/admin/produks/${produk.id}`}
                className="border rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={imageSrc}
                    alt={produk.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <div className="text-sm font-semibold">{produk.name}</div>
                  <div className="text-xs text-gray-600">
                    Rp {produk.price.toLocaleString("id-ID")} • Kapasitas{" "}
                    {produk.capacity}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {produk.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
