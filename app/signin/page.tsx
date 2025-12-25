"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // kalau ada ?callbackUrl= pakai itu, kalau tidak → /admin
      const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setError(res.error || "Login gagal");
        return;
      }

      const targetUrl = res?.url ?? callbackUrl;
      router.push(targetUrl);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
      <div className="bg-white border rounded-xl shadow-sm p-8 w-full max-w-lg">
        <h1 className="text-xl font-semibold text-center mb-6">
          Sign In Kaluna Living
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-600">Username</label>
            <input
              type="text"
              className="border rounded-md px-3 py-2 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-600">Password</label>
            <input
              type="password"
              className="border rounded-md px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-orange-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up link */}
        <div className="mt-4 text-center text-xs text-gray-600">
          Belum punya akun?{" "}
          <Link
            href="/signup"
            className="text-orange-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
