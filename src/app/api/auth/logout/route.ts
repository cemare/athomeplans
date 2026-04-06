import { NextResponse } from "next/server";
import { clearSessionCookie, deleteSessionByCookie } from "@/lib/auth";

export async function POST() {
  await deleteSessionByCookie();
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
