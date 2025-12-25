"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24 pb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Kirim Link Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
