"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role as
    | "ADMIN"
    | "OWNER"
    | "CUSTOMER"
    | undefined;

  const isAdminLike = role === "ADMIN" || role === "OWNER";

  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link href={isAdminLike ? "/admin" : "/"}>
          <Image
            src="/logo.png"
            alt="Kaluna Living"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[128px] h-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          {/* 👉 MENU CUSTOMER: hanya tampil kalau BUKAN admin/owner */}
          {!isAdminLike && (
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link href="/">HOME</Link>
              <Link href="/about">ABOUT</Link>
              <Link href="/produk">PRODUCT</Link>
              <Link href="/checkout">ORDER</Link>
              <Link href="/myreservation">MY RESERVATION</Link>
            </nav>
          )}

          {/* Avatar + SignIn/SignOut */}
          <div className="flex items-center gap-3">
            {session && (
              <div className="text-sm bg-gray-50 border rounded-full flex items-center justify-center w-8 h-8">
                <span className="text-xs font-semibold">
                  {session.user?.name?.charAt(0) ??
                    (session.user as any)?.username?.charAt(0) ??
                    "U"}
                </span>
              </div>
            )}

            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="py-2 px-4 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-sm text-sm"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/signin"
                className="py-2 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
