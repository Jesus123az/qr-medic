import type { Metadata } from "next";
import { Inter, Red_Hat_Text } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
// import { usePathname } from "next/navigation";


const redHatText = Red_Hat_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Medic | Connecting to your care",
  description: "At QR Medic, our mission is to empower individuals who are unable to help themselves during critical moments. Through advanced Augmented Reality technology, we ensure critical health details are instantly available in emergency situations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={redHatText.className}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
        </body>
    </html>
  );
}
