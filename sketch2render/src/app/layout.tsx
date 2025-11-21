import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sketch2Render Blueprint",
  description:
    "Technical blueprint for building the Sketch2Render hyperrealistic image-to-image pipeline with natural lighting and shadow fidelity.",
  metadataBase: new URL("https://agentic-ba9b87c2.vercel.app"),
  openGraph: {
    title: "Sketch2Render Technical Blueprint",
    description:
      "Architecture, algorithms, and UX guidance for transforming sketches into hyperrealistic renders.",
    url: "https://agentic-ba9b87c2.vercel.app",
    siteName: "Sketch2Render",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sketch2Render Technical Blueprint",
    description:
      "Engineering and design playbook for high-fidelity sketch-to-render generation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
