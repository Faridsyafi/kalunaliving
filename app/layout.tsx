import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import WhatsAppPopup from "@/components/whatsapp-popup";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaluna Living",
  description: "Hotel Booking Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${josefinSans.className} antialiased`}>
        <SessionProvider session={session}>
          <Navbar />
          
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>

          <Footer />
          <WhatsAppPopup />
        </SessionProvider>
      </body>
    </html>
  );
}
