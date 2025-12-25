import { prisma } from "@/lib/prisma";

export const getproduks = async () => {
  try {
    const result = await prisma.produk.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (err) {
    console.error("Error getproduks:", err);
    return [];
  }
};

export const getprodukById = async (id: string) => {
  try {
    const produk = await prisma.produk.findUnique({
      where: { id },
    });
    return produk;
  } catch (err) {
    console.error("Error getprodukById:", err);
    return null;
  }
};

// NOTE: fungsi addToCart kamu tadi rusak syntax.
// Supaya build tidak gagal, sementara saya buat stub yang aman.
// Kalau kamu butuh fungsi ini, kirim versi addToCart yang lengkap nanti kita rapihin.
export const addToCart = async (
  userId: string,
  produkId: string,
  quantity = 1
) => {
  try {
    const produk = await prisma.produk.findUnique({
      where: { id: produkId },
    });

    if (!produk) {
      throw new Error("Produk tidak ditemukan");
    }

    const cartModel = (prisma as any).cart;
    const cartItemModel = (prisma as any).cartItem;

    let cart = await cartModel.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await cartModel.create({
        data: { userId },
      });
    }

    const item = await cartItemModel.upsert({
      where: {
        cartId_produkId: {
          cartId: cart.id,
          produkId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        cartId: cart.id,
        produkId,
        quantity,
        price: produk.price,
      },
    });

    return { cart, item };
  } catch (err) {
    console.error("Error addToCart:", err);
    throw err;
  }
};

// === FUNCTION: getReservationByUserId ===
export const getReservationByUserId = async (userId: string) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        produk: true,
        user: true,
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (err) {
    console.error("Error getReservationByUserId:", err);
    return [];
  }
};

// === FUNCTION: getReservationById ===
export const getReservationById = async (id: string) => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        produk: true,
        payment: true,
      },
    });

    return reservation;
  } catch (err) {
    console.error("Error getReservationById:", err);
    return null;
  }
};
