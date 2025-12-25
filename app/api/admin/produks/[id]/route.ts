import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET produk by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const produk = await prisma.produk.findUnique({
      where: { id },
    });

    if (!produk) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(produk);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}

// UPDATE produk by ID
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const produk = await prisma.produk.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(produk);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal update produk" },
      { status: 500 }
    );
  }
}
