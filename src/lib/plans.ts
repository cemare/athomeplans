export type DesignPlan = {
  slug: string;
  title: string;
  category: string;
  style: string;
  estimatedBudgetUsd: number;
  roomSizeSqFt?: number;
  featured?: boolean;
  coverImage?: string;
  summary: string;
  details: string[];
  shoppingLinks?: Array<{ label: string; url: string }>;
};

const planModules = import.meta.glob<DesignPlan>("../../content/plans/*.json", {
  eager: true,
  import: "default",
});

function readAllPlans(): DesignPlan[] {
  const plans = Object.values(planModules);

  for (const plan of plans) {
    if (!plan.slug || !plan.title || !plan.summary || !Array.isArray(plan.details)) {
      throw new Error(`Invalid design plan schema: ${plan.slug ?? "unknown"}`);
    }
  }

  return plans.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getAllPlans(): DesignPlan[] {
  return readAllPlans();
}

export function getPlanBySlug(slug: string): DesignPlan | null {
  return getAllPlans().find((entry) => entry.slug === slug) ?? null;
}
