import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_URL } from "@/lib/site";
import { siteContent } from "@/data/content";

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

const siteTitle = "GRP Fibre and Pressed Steel Water Tanks in Nigeria | FST Engineering";
const siteDescription =
  "Hygienic, low maintenance GRP/FRP fibre and pressed steel water tanks in Nigeria. Built with Malaysia's leading tank manufacturer to BS, MS and SS standards.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: "FST Engineering" }],
  referrer: "strict-origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "FST Engineering",
    locale: "en_NG",
    url: SITE_URL,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FST Engineering, Fibre and Steel Water Tanks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FST Engineering, Fibre and Steel Water Tanks",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/images/logo.png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const telephones = siteContent.contact.phone.numbers
    ? siteContent.contact.phone.numbers.map((n) => n.display)
    : [siteContent.contact.phone.display];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FST Engineering",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-image.png`,
    description: siteDescription,
    telephone: telephones.length === 1 ? telephones[0] : telephones,
    email: siteContent.contact.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mile 12 Ikorodu Road, Owode Onirin",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    areaServed: "Nigeria",
  };

  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-body text-[#555B61] bg-white antialiased selection:bg-[#1E9BD0]/20 selection:text-[#10337A]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
