import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const ProtectedRoutes = ["/myreservation", "/checkout", "/admin"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role as "ADMIN" | "OWNER" | "CUSTOMER" | undefined;
  const { pathname, search } = request.nextUrl;

  // 1) WAJIB LOGIN untuk route tertentu (myreservation, checkout, admin)
  if (
    !isLoggedIn &&
    ProtectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    const signInUrl = new URL("/signin", request.url);
    // simpan tujuan awal sebagai callbackUrl (misal /admin/products)
    signInUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(signInUrl);
  }

  // 2) SUDAH LOGIN tapi BUKAN ADMIN / OWNER → TIDAK BOLEH akses /admin
  if (
    isLoggedIn &&
    pathname.startsWith("/admin") &&
    role !== "ADMIN" &&
    role !== "OWNER"
  ) {
    // lempar ke beranda
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3) SUDAH LOGIN tapi mencoba buka /signin
  if (isLoggedIn && pathname.startsWith("/signin")) {
    // Admin & Owner diarahkan ke dashboard admin
    if (role === "ADMIN" || role === "OWNER") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Customer diarahkan ke home
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
