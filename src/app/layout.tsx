import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://athomeplans.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "At Home Plans",
    template: "%s | At Home Plans",
  },
  description:
    "Interior design plans and blog guides from At Home Plans.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "At Home Plans",
    description: "Interior design plans and blog guides from At Home Plans.",
    siteName: "At Home Plans",
    images: [
      {
        url: "/images/og-default.svg",
        width: 1200,
        height: 630,
        alt: "At Home Plans Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "At Home Plans",
    description: "Interior design plans and blog guides from At Home Plans.",
    images: ["/images/og-default.svg"],
  },
  other: {
    "pinterest-rich-pin": "true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <div className="container navWrap">
            <Link href="/" className="brandLink">
              At Home Plans
            </Link>
            <nav className="mainNav" aria-label="Main navigation">
              <Link href="/plans">Plans</Link>
              <Link href="/blog">Blog</Link>
              <a href="https://www.etsy.com/shop/athomeplans" target="_blank" rel="noreferrer">
                Etsy Shop
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="siteFooter">
          <div className="container footerGrid">
            <div>
              <h2>At Home Plans</h2>
              <p>Making interior design accessible with ready-made and custom room plans.</p>
            </div>
            <div>
              <h2>Shop Links</h2>
              <ul>
                <li>
                  <a href="https://www.etsy.com/shop/athomeplans" target="_blank" rel="noreferrer">
                    Main Etsy Store
                  </a>
                </li>
                <li>
                  <a href="https://www.etsy.com/shop/athomeplans?section_id=0" target="_blank" rel="noreferrer">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="copyright">&copy; {year} At Home Plans</p>
        </footer>
      </body>
    </html>
  );
}
