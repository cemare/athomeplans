import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import SavePlanButton from "@/components/SavePlanButton";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatBudget(cents: number | null): string {
  if (!cents) return "Price TBD";
  return `$${(cents / 100).toLocaleString()}`;
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const plan = await db.designPlan.findUnique({
    where: { slug, published: true },
    include: { furnitureItems: true, tags: true },
  });

  if (!plan) notFound();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <nav style={{ marginBottom: "1.5rem", fontSize: "0.875rem", color: "var(--color-muted)" }}>
        <Link href="/catalog">← Back to Catalog</Link>
      </nav>

      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.75rem" }}>
        {plan.title}
      </h1>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <span
          style={{
            background: "#f0f0ff",
            color: "var(--color-accent)",
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            fontSize: "0.8rem",
            fontWeight: 500,
          }}
        >
          {plan.style.replace(/_/g, " ")}
        </span>
        <span
          style={{
            background: "#f5f5f5",
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            fontSize: "0.8rem",
          }}
        >
          {plan.category.replace(/_/g, " ")}
        </span>
        {plan.roomSizeSqFt && (
          <span style={{ fontSize: "0.8rem", color: "var(--color-muted)", alignSelf: "center" }}>
            {plan.roomSizeSqFt} sq ft
          </span>
        )}
      </div>

      <div
        style={{
          height: "300px",
          background: "#f5f5f5",
          borderRadius: "var(--radius)",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-muted)",
        }}
      >
        {plan.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={plan.coverImageUrl}
            alt={plan.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius)" }}
          />
        ) : (
          "Cover image coming soon"
        )}
      </div>

      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem", color: "#333" }}>
        {plan.description}
      </p>

      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          padding: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.25rem" }}>
            Estimated Budget
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            {formatBudget(plan.estimatedBudgetUsd)}
          </div>
        </div>
        <SavePlanButton title={plan.title} sourcePlanSlug={plan.slug} />
      </div>

      {plan.tags.length > 0 && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {plan.tags.map((tag) => (
            <span
              key={tag.id}
              style={{
                background: "#f5f5f5",
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
