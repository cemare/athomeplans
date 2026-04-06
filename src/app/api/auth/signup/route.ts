import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, hashPassword, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? "";

  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: "Valid email and password (8+ chars) required." }, { status: 400 });
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  const token = await createSession(user.id);
  await setSessionCookie(token);

  return NextResponse.json({ id: user.id, email: user.email });
}
