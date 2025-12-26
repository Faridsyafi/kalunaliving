"use client";

import { useState, type FormEvent } from "react";
import type { Produk } from "@prisma/client";

type Props = {
  initialproduks: Produk[];
};

export default function ProdukTable({ initialproduks }: Props) {
  const [produks, setproduks] = useState<Produk[]>(initialproduks);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    capacity: "1",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("capacity", form.capacity);
      if (imageFile) fd.append("image", imageFile);

      const res = await fetch("/api/admin/produks", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({} as any));
        throw new Error(data.message || "Gagal menambahkan produk");
      }

      const newproduk: Produk = await res.json();
      setproduks((prev) => [newproduk, ...prev]);

      setForm({ name: "", description: "", price: "", capacity: "1" });
      setImageFile(null);

      const fileInput = document.getElementById(
        "produk-image-input"
      ) as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <h2 className="text-sm font-semibold mb-3">Tambah produk</h2>

        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Nama produk"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-3 py-2 rounded-md"
            required
          />

          <input
            type="text"
            placeholder="Harga"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border px-3 py-2 rounded-md"
            required
          />

          <input
            type="number"
            placeholder="Kapasitas"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            className="border px-3 py-2 rounded-md"
            min={1}
          />

          <input
            id="produk-image-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="border px-3 py-2 rounded-md"
          />

          <textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="border px-3 py-2 rounded-md md:col-span-2"
            required
          />

          {error && (
            <div className="md:col-span-2 text-sm text-red-500">{error}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 bg-orange-500 text-white py-2 rounded-md"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan produk"}
          </button>
        </form>
      </div>
    </div>
  );
}
