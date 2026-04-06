import { notFound } from "next/navigation";
import { db } from "@/lib/db";

type PageProps = {
  params: Promise<{ shareToken: string }>;
};

export default async function SharedPlanPage({ params }: PageProps) {
  const { shareToken } = await params;
  const savedPlan = await db.savedPlan.findUnique({
    where: { shareToken },
    include: {
      user: { select: { email: true } },
      sourcePlan: { select: { title: true, slug: true } },
    },
  });

  if (!savedPlan) notFound();

  const layout = JSON.parse(savedPlan.layoutJson || "{}") as Record<string, unknown>;

  return (
    <div style={{ maxWidth: 850, margin: "0 auto", padding: "2rem 1rem 3rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{savedPlan.title}</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1rem" }}>
        Shared by {savedPlan.user.email}
      </p>

      {savedPlan.sourcePlan ? (
        <p style={{ marginBottom: "1rem" }}>
          Source plan: <a href={`/catalog/${savedPlan.sourcePlan.slug}`}>{savedPlan.sourcePlan.title}</a>
        </p>
      ) : null}

      {savedPlan.notes ? (
        <p style={{ marginBottom: "1rem" }}>{savedPlan.notes}</p>
      ) : null}

      <section style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "1rem" }}>
        <h2 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>Saved Layout JSON</h2>
        <pre
          style={{
            background: "#f7f7f7",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "0.8rem",
            overflowX: "auto",
            fontSize: "0.85rem",
          }}
        >
          {JSON.stringify(layout, null, 2)}
        </pre>
      </section>
    </div>
  );
}
