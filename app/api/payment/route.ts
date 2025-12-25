import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import midtransClient from "midtrans-client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const reservationId = body.reservationId as string;

    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: {
        payment: true, // ✅ wajib supaya ada amount
        produk: true,
        user: true,
      },
    });

    if (!reservation) {
      return NextResponse.json({ message: "Reservation tidak ditemukan" }, { status: 404 });
    }

    const amount = reservation.payment?.amount ?? 0;
    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Amount pembayaran tidak valid" }, { status: 400 });
    }

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    const parameter = {
      transaction_details: {
        order_id: reservation.id,
        gross_amount: amount, // ✅ bukan reservation.Payment?.amount
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: reservation.user?.name ?? "Customer",
        email: reservation.user?.email ?? "customer@email.com",
        phone: reservation.user?.phone ?? "",
      },
    };

    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json({ token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Gagal membuat transaksi" }, { status: 500 });
  }
}
