// app/signup/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          username,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrasi gagal");
      } else {
        setSuccess("Registrasi berhasil. Mengalihkan ke halaman login...");
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      }
    } catch {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    // ⬇⬇⬇ padding top & bottom supaya tidak tertutup header
    <div className="min-h-screen bg-[#f7f7f7] pt-24 pb-16 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Buat akun baru sebagai Customer
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nama lengkap"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
              />
            </div>

            {/* No Telepon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. Telepon
              </label>
              <input
                type="tel"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="08xxxxxxxxxx"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            {/* Error & Success */}
            {error && <p className="text-xs text-red-600">{error}</p>}
            {success && <p className="text-xs text-green-600">{success}</p>}

            {/* Tombol submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-orange-500 hover:bg-orange-600 text-white py-2.5 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Buat Akun"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Sudah punya akun?{" "}
            <a
              href="/signin"
              className="text-orange-600 hover:underline font-medium"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
