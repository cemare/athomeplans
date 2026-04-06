import { db } from "@/lib/db";
import type { PlanCategory, PlanStyle, CatalogFilters } from "@/types";
import { PLAN_CATEGORIES, PLAN_STYLES } from "@/types";
import Link from "next/link";
import CatalogFilterBar from "@/components/CatalogFilterBar";

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

function formatLabel(val: string): string {
  return val.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
              { title: { contains: filters.q } },
              { description: { contains: filters.q } },
            ],
          }
        : {}),
    },
    include: { tags: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const activeFiltersCount = [filters.category, filters.style, filters.featured, filters.q].filter(
    Boolean
  ).length;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          Design Catalog
        </h1>
        <p style={{ color: "var(--color-muted)" }}>
          {plans.length} plan{plans.length !== 1 ? "s" : ""} available
          {activeFiltersCount > 0 && ` · ${activeFiltersCount} filter${activeFiltersCount !== 1 ? "s" : ""} active`}
        </p>
      </div>

      <CatalogFilterBar
        categories={PLAN_CATEGORIES}
        styles={PLAN_STYLES}
        currentCategory={filters.category}
        currentStyle={filters.style}
        currentQ={filters.q}
        currentFeatured={filters.featured}
      />

      {plans.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ color: "var(--color-muted)", marginBottom: "1rem" }}>
            No plans match your filters.
          </p>
          <Link href="/catalog" style={{ color: "var(--color-accent)" }}>
            Clear filters
          </Link>
        </div>
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
                  height: "100%",
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
                    fontSize: "2rem",
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
                    <span title={plan.category}>{categoryEmoji(plan.category)}</span>
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
                      alignItems: "center",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        background: "#f0f0ff",
                        color: "var(--color-accent)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "999px",
                      }}
                    >
                      {formatLabel(plan.style)}
                    </span>
                    <span style={{ color: "var(--color-muted)" }}>
                      {formatBudget(plan.estimatedBudgetUsd)}
                    </span>
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

function categoryEmoji(category: string): string {
  const map: Record<string, string> = {
    LIVING_ROOM: "🛋️",
    BEDROOM: "🛏️",
    KITCHEN: "🍳",
    BATHROOM: "🛁",
    DINING_ROOM: "🍽️",
    HOME_OFFICE: "💻",
    FULL_HOME: "🏠",
  };
  return map[category] ?? "🏡";
}
