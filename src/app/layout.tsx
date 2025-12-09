import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import StructuredData from "@/components/Common/StructuredData";
import { SITE_URL } from "@/utils/seo";
import type { Metadata, Viewport } from "next";

const dmsans = DM_Sans({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

// Viewport configuration for all modern browsers
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// Root metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon/favicon-logo16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/icon/favicon-logo32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/icon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icon/logo_vector.svg",
        color: "#467FC1",
      },
    ],
  },
  verification: {
     google: "google-site-verification=xQZOqkrEqlUATyGM-PAR3CCqEuk_bTqCELvJsFqlIMI"
  },
  other: {
    "msapplication-TileColor": "#467FC1",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${dmsans.className}`} suppressHydrationWarning>
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
