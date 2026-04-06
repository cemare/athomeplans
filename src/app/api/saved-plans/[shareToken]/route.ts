import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{ shareToken: string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const { shareToken } = await params;

  const saved = await db.savedPlan.findUnique({
    where: { shareToken },
    include: {
      user: { select: { email: true } },
      sourcePlan: { select: { title: true, slug: true } },
    },
  });

  if (!saved) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    data: {
      title: saved.title,
      notes: saved.notes,
      roomType: saved.roomType,
      style: saved.style,
      palette: saved.palette,
      layout: JSON.parse(saved.layoutJson || "{}"),
      sharedBy: saved.user.email,
      sourcePlan: saved.sourcePlan,
      createdAt: saved.createdAt,
    },
  });
}
