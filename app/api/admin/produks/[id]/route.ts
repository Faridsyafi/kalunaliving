import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;

    // contoh: ambil data dari body (sesuaikan kebutuhanmu)
    const body = await req.json().catch(() => ({}));

    const updated = await prisma.produk.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Gagal update produk" }, { status: 500 });
  }
}
