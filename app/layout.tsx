import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beautiful QR Code Generator",
  description: "Generate premium QR codes and download as PNG or SVG.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en">
      <body>{children}</body>

      {/* AdSense script (loads only if client id exists) */}
      {client ? (
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
          crossOrigin="anonymous"
        />
      ) : null}
    </html>
  );
}