import type { DesignPlan, FurnitureItem, Tag, PlanCategory, PlanStyle } from "@prisma/client";

export type { PlanCategory, PlanStyle };

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
  minRoomSizeSqFt?: number;
  maxRoomSizeSqFt?: number;
  featured?: boolean;
  tag?: string;
  q?: string;
};
