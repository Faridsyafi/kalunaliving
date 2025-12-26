import React from "react";
import { getAmenities, getprodukById } from "@/lib/data";
import { notFound } from "next/navigation";
import EditForm from "@/components/admin/room/edit-form";

const Editproduk = async ({ produkId }: { produkId: string }) => {
  const [amenities, produk] = await Promise.all([
    getAmenities(),
    getprodukById(produkId),
  ]);

  if (!produk) return notFound();

  return <EditForm amenities={amenities as any} produk={produk as any} />;
};

export default Editproduk;
