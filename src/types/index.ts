import type { DesignPlan, FurnitureItem, Tag } from "@prisma/client";

export type PlanCategory =
  | "LIVING_ROOM"
  | "BEDROOM"
  | "KITCHEN"
  | "BATHROOM"
  | "DINING_ROOM"
  | "HOME_OFFICE"
  | "FULL_HOME";

export type PlanStyle =
  | "MODERN"
  | "CONTEMPORARY"
  | "TRADITIONAL"
  | "MINIMALIST"
  | "BOHEMIAN"
  | "SCANDINAVIAN"
  | "INDUSTRIAL"
  | "COASTAL";

export const PLAN_CATEGORIES: { value: PlanCategory; label: string }[] = [
  { value: "LIVING_ROOM", label: "Living Room" },
  { value: "BEDROOM", label: "Bedroom" },
  { value: "KITCHEN", label: "Kitchen" },
  { value: "BATHROOM", label: "Bathroom" },
  { value: "DINING_ROOM", label: "Dining Room" },
  { value: "HOME_OFFICE", label: "Home Office" },
  { value: "FULL_HOME", label: "Full Home" },
];

export const PLAN_STYLES: { value: PlanStyle; label: string }[] = [
  { value: "MODERN", label: "Modern" },
  { value: "CONTEMPORARY", label: "Contemporary" },
  { value: "TRADITIONAL", label: "Traditional" },
  { value: "MINIMALIST", label: "Minimalist" },
  { value: "BOHEMIAN", label: "Bohemian" },
  { value: "SCANDINAVIAN", label: "Scandinavian" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "COASTAL", label: "Coastal" },
];

export type DesignPlanWithRelations = DesignPlan & {
  furnitureItems: FurnitureItem[];
  tags: Tag[];
};

export type DesignPlanSummary = Pick<
  DesignPlan,
  | "id"
  | "title"
  | "slug"
  | "description"
  | "category"
  | "style"
  | "roomSizeSqFt"
  | "estimatedBudgetUsd"
  | "coverImageUrl"
  | "featured"
>;

export type CatalogFilters = {
  category?: PlanCategory;
  style?: PlanStyle;
  maxBudgetUsd?: number;
  featured?: boolean;
  q?: string;
};
