import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FST Engineering | Fibre & Steel Water Storage Tanks",
  description:
    "We specialize in Fibre and Steel Water Tanks, built to solve the hygiene and maintenance problems of conventional tanks. We deliver premium, long-lasting water storage compliant with BS EN 13280, MS 1390, and SS 245 standards.",
  authors: [{ name: "FST Engineering" }],
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-body text-[#555B61] bg-white antialiased selection:bg-[#1E9BD0]/20 selection:text-[#10337A]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
