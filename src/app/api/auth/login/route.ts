import { NextResponse } from "next/server";
import { createSession, setSessionCookie, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });

  const token = await createSession(user.id);
  await setSessionCookie(token);

  return NextResponse.json({ id: user.id, email: user.email });
}
