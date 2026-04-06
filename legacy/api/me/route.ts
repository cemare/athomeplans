import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ user: null });

  const savedPlanCount = await db.savedPlan.count({
    where: { userId: user.id },
  });

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      savedPlanCount,
    },
  });
}
