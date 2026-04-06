import { db } from "@/lib/db";
import type { PlanCategory, PlanStyle, CatalogFilters } from "@/types";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    category?: string;
    style?: string;
    featured?: string;
    q?: string;
  }>;
};

function formatBudget(cents: number | null): string {
  if (!cents) return "Price TBD";
  return `$${(cents / 100).toLocaleString()}`;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters: CatalogFilters = {
    category: params.category as PlanCategory | undefined,
    style: params.style as PlanStyle | undefined,
    featured: params.featured === "true" ? true : undefined,
    q: params.q,
  };

  const plans = await db.designPlan.findMany({
    where: {
      published: true,
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.style ? { style: filters.style } : {}),
      ...(filters.featured !== undefined ? { featured: filters.featured } : {}),
      ...(filters.q
        ? {
            OR: [
              { title: { contains: filters.q, mode: "insensitive" } },
              { description: { contains: filters.q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { tags: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
        Design Catalog
      </h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "2rem" }}>
        {plans.length} plan{plans.length !== 1 ? "s" : ""} available
      </p>

      {plans.length === 0 ? (
        <p style={{ color: "var(--color-muted)", textAlign: "center", padding: "4rem 0" }}>
          No plans found. Check back soon!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {plans.map((plan) => (
            <Link
              key={plan.id}
              href={`/catalog/${plan.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  transition: "box-shadow 0.15s",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-muted)",
                    fontSize: "0.875rem",
                  }}
                >
                  {plan.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={plan.coverImageUrl}
                      alt={plan.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    "No image yet"
                  )}
                </div>
                <div style={{ padding: "1rem" }}>
                  {plan.featured && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--color-accent)",
                        marginBottom: "0.25rem",
                        display: "block",
                      }}
                    >
                      Featured
                    </span>
                  )}
                  <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                    {plan.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-muted)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {plan.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: "var(--color-muted)",
                    }}
                  >
                    <span>{plan.style.replace(/_/g, " ")}</span>
                    <span>{formatBudget(plan.estimatedBudgetUsd)}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
