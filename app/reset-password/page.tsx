"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    setMessage(data.message);

    if (res.ok) {
      setTimeout(() => router.push("/signin"), 1500);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24 pb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Buat Password Baru</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password baru"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Simpan Password Baru
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
