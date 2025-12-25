"use client";

import { useState } from "react";
import Link from "next/link";
import { IoLogoWhatsapp, IoClose } from "react-icons/io5";

const WhatsAppPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const phone = "081234546572";
  const encodedText = encodeURIComponent("Halo Kaluna Living, saya mau pesan.");

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 max-w-xs w-64 bg-white shadow-lg border rounded-lg p-4 text-sm z-40">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Chat via WhatsApp</span>
            <button
              aria-label="Tutup popup WhatsApp"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoClose className="size-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-3">
            Hai! Butuh bantuan? Klik tombol di bawah untuk chat langsung.
          </p>
          <Link
            href={`https://wa.me/62${phone.slice(1)}?text=${encodedText}`}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            <IoLogoWhatsapp className="size-5" />
            Mulai Chat
          </Link>
        </div>
      )}
      <button
        aria-label="Buka WhatsApp"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-40"
      >
        <IoLogoWhatsapp className="size-7" />
      </button>
    </>
  );
};

export default WhatsAppPopup;
