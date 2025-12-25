// app/api/produks/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // ← TIDAK ada cek "ID produk tidak valid" di sini

    const formData = await req.formData();

    const name = formData.get("name");
    const priceRaw = formData.get("price");
    const capacityRaw = formData.get("capacity");
    const description = formData.get("description");
    const image = formData.get("image") as File | null;

    // Validasi data form (bukan ID)
    if (!name || !priceRaw || !capacityRaw || !description) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const price = Number(priceRaw);
    const capacity = Number(capacityRaw);

    if (Number.isNaN(price) || Number.isNaN(capacity)) {
      return NextResponse.json(
        { message: "Harga atau kapasitas tidak valid" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;

    // Jika upload gambar baru
    if (image && typeof image === "object" && "arrayBuffer" in image) {
      const buffer = Buffer.from(await image.arrayBuffer());

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const originalName =
        typeof (image as any)?.name === "string"
          ? (image as any).name
          : "produk.jpg";

      const filename = `${Date.now()}-${originalName}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${filename}`;
    }

    // 🔥 Update berdasarkan ID
    const updated = await prisma.produk.update({
      where: { id },
      data: {
        name: String(name),
        price,
        capacity,
        description: String(description),
        ...(imagePath && { image: imagePath }),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error("Gagal update produk:", err);

    if (
      typeof err?.message === "string" &&
      err.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan di database" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          typeof err?.message === "string"
            ? err.message
            : "Gagal update produk",
      },
      { status: 500 }
    );
  }
}
