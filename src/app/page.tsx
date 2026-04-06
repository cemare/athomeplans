import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}>
      <section style={{ textAlign: "center", paddingBottom: "4rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", lineHeight: 1.2, marginBottom: "1.5rem" }}>
          Interior Design,<br />Made Accessible
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#555", maxWidth: "600px", margin: "0 auto 2rem" }}>
          Browse hundreds of pre-made interior design plans — furniture arrangements, decor ideas, and full floor plans for every style and budget.
        </p>
        <Link
          href="/catalog"
          style={{
            display: "inline-block",
            background: "var(--color-accent)",
            color: "#fff",
            padding: "0.875rem 2rem",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Browse the Catalog
        </Link>
        <Link
          href="/builder"
          style={{
            display: "inline-block",
            marginLeft: "0.75rem",
            background: "#111",
            color: "#fff",
            padding: "0.875rem 2rem",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Start a Custom Plan
        </Link>
      </section>

      <section>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
          What We Offer
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {[
            {
              title: "Pre-Made Plans",
              desc: "Ready-to-use room designs crafted by professional designers.",
            },
            {
              title: "Every Style",
              desc: "Modern, Scandinavian, Industrial, Bohemian, and more.",
            },
            {
              title: "Every Budget",
              desc: "Plans from budget-friendly to luxury, filtered to your range.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
              }}
            >
              <h3 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>{item.title}</h3>
              <p style={{ color: "var(--color-muted)", fontSize: "0.95rem" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
