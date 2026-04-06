import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Athena Interior | Make Interior Design Accessible",
  description:
    "Browse pre-made interior design plans for every room, style, and budget. From furniture to full floor plans.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem 2rem", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ fontSize: "1.25rem", fontWeight: "bold", textDecoration: "none", color: "inherit" }}>
            Athena Interior
          </a>
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            <a href="/catalog" style={{ textDecoration: "none", color: "inherit" }}>Catalog</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ padding: "2rem", textAlign: "center", borderTop: "1px solid #eee", marginTop: "4rem", color: "#666", fontSize: "0.875rem" }}>
          &copy; {new Date().getFullYear()} Athena Interior. Making design accessible.
        </footer>
      </body>
    </html>
  );
}
