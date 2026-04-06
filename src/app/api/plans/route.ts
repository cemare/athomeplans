import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { PlanCategory, PlanStyle } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category") as PlanCategory | null;
  const style = searchParams.get("style") as PlanStyle | null;
  const featured = searchParams.get("featured");
  const q = searchParams.get("q");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20", 10));

  const where = {
    published: true,
    ...(category ? { category } : {}),
    ...(style ? { style } : {}),
    ...(featured === "true" ? { featured: true } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" as const } },
            { description: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [plans, total] = await Promise.all([
    db.designPlan.findMany({
      where,
      include: { tags: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.designPlan.count({ where }),
  ]);

  return NextResponse.json({
    data: plans,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
