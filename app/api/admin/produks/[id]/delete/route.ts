import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;

    await prisma.produk.delete({
      where: { id },
    });

    // redirect setelah hapus
    return NextResponse.redirect(new URL("/admin/products", req.url));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Gagal menghapus produk" }, { status: 500 });
  }
}
