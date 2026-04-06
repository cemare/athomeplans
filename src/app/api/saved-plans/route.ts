import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

type LayoutPayload = {
  roomType?: string;
  style?: string;
  palette?: string;
  furniture?: Array<{ type?: string; x?: number; y?: number; width?: number; depth?: number }>;
};

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const savedPlans = await db.savedPlan.findMany({
    where: { userId: user.id },
    include: { sourcePlan: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: savedPlans });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as {
    title?: string;
    notes?: string;
    sourcePlanSlug?: string;
    layout?: LayoutPayload;
  } | null;

  const title = body?.title?.trim();
  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });

  const sourcePlan = body?.sourcePlanSlug
    ? await db.designPlan.findUnique({ where: { slug: body.sourcePlanSlug } })
    : null;

  const saved = await db.savedPlan.create({
    data: {
      userId: user.id,
      title,
      notes: body?.notes?.trim() || null,
      sourcePlanId: sourcePlan?.id ?? null,
      roomType: body?.layout?.roomType ?? null,
      style: body?.layout?.style ?? null,
      palette: body?.layout?.palette ?? null,
      layoutJson: JSON.stringify(body?.layout ?? {}),
    },
  });

  return NextResponse.json({ data: saved }, { status: 201 });
}
