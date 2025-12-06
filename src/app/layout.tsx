import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ethery.tech'),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon/favicon-logo16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/icon/favicon-logo32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon/logo-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icon/logo_vector.svg",
      },
    ],
  },
  verification: {
     google: "google-site-verification=xQZOqkrEqlUATyGM-PAR3CCqEuk_bTqCELvJsFqlIMI"
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
