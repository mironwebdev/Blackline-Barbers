import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are self-hosted from the @fontsource packages: no request to Google
// at runtime or build time.
const sans = localFont({
  src: "../../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter-tight",
  display: "swap",
});

const serif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      style: "italic",
    },
  ],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const description =
  "Blackline Barbers, Business Bay. Considered cuts, proper technique and attention to detail. A fictional brand created as a web design portfolio piece.";

export const metadata: Metadata = {
  title: {
    default: "Blackline Barbers — Business Bay, Dubai",
    template: "%s — Blackline Barbers",
  },
  description,
  applicationName: "Blackline Barbers",
  keywords: [
    "barber Dubai",
    "Business Bay barber",
    "skin fade Dubai",
    "beard trim",
    "men's grooming",
  ],
  openGraph: {
    type: "website",
    title: "Blackline Barbers — Good hair. No shortcuts.",
    description,
    siteName: "Blackline Barbers",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blackline Barbers — Good hair. No shortcuts.",
    description,
  },
  // Portfolio demo: keep it out of search indexes so it is never mistaken
  // for a real business listing.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1b19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
