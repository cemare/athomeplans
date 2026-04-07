import fs from "node:fs";
import path from "node:path";

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

const plansDir = path.join(process.cwd(), "content", "plans");

function readPlanFile(filePath: string): DesignPlan {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as DesignPlan;

  if (!parsed.slug || !parsed.title || !parsed.summary || !Array.isArray(parsed.details)) {
    throw new Error(`Invalid design plan schema: ${filePath}`);
  }

  return parsed;
}

function readAllPlans(): DesignPlan[] {
  if (!fs.existsSync(plansDir)) return [];

  const files = fs
    .readdirSync(plansDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(plansDir, name));

  return files
    .map(readPlanFile)
    .sort((a, b) => {
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
