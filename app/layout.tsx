"use client"
import type { Metadata } from "next";
import { Inter, Red_Hat_Text } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
// import { usePathname } from "next/navigation";


const redHatText = Red_Hat_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
// const pathname = usePathname();
// if(pathname==="/ar"){
//   return(
//     <html lang="en">
//     <body className={redHatText.className}>
//       {children}
//       </body>
//   </html>
//   )
// }
  return (
    <html lang="en">
      <body className={redHatText.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
