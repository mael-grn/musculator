import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/navbar";

export const metadata: Metadata = {
  title: "Musculator",
  description: "Musculate your muscle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
    <body>
    <Navbar/>
    <script type="module" defer src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/cardio.js"></script>

    {children}
    </body>
    </html>
  );
}
