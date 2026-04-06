import { cookies } from "next/headers";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { db } from "@/lib/db";

const scrypt = promisify(scryptCallback);

const SESSION_COOKIE_NAME = "ath_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, savedHashHex] = stored.split(":");
  if (!salt || !savedHashHex) return false;
  const incomingHash = (await scrypt(password, salt, 64)) as Buffer;
  const savedHash = Buffer.from(savedHashHex, "hex");
  if (incomingHash.length !== savedHash.length) return false;
  return timingSafeEqual(incomingHash, savedHash);
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  await db.userSession.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
  return token;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await db.userSession.findUnique({
    where: { token },
    include: {
      user: true,
    },
  });

  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await db.userSession.delete({ where: { token } }).catch(() => null);
    return null;
  }

  return session.user;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function deleteSessionByCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return;
  await db.userSession.delete({ where: { token } }).catch(() => null);
}
