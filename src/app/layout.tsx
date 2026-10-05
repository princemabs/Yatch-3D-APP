import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aventisyachts.com"),
  title: "Aventis Yacht Charters — Bespoke Private Luxury Yacht Charters",
  description:
    "World-class private luxury yacht charter brokerage based in Newport, Rhode Island. Curated maritime voyages handcrafted for those who demand the finest in luxury yachting.",
  alternates: { canonical: "https://aventisyachts.com/" },
  openGraph: {
    title: "Aventis Yacht Charters",
    description:
      "Bespoke private luxury yacht charters. Extraordinary journeys across the world's most beautiful waters.",
    url: "https://aventisyachts.com/",
    siteName: "Aventis Yacht Charters",
    images: [{ url: "/images/cta_lounge_sunset.jpg", width: 1920, height: 1080 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aventis Yacht Charters",
    description: "Bespoke private luxury yacht charters since 1988.",
    images: ["/images/cta_lounge_sunset.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BoatReservation",
  name: "Aventis Yacht Charters",
  description:
    "World-class private luxury yacht charter brokerage based in Newport, Rhode Island.",
  url: "https://aventisyachts.com",
  telephone: "+1-800-555-9224",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Commercial Wharf",
    addressLocality: "Newport",
    addressRegion: "RI",
    postalCode: "02840",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
