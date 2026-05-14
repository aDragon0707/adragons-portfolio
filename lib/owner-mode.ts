import { createHmac, timingSafeEqual } from "crypto";
import { cookies, headers } from "next/headers";
import type { NextRequest } from "next/server";

export const OWNER_COOKIE = "adg_owner_mode";

const OWNER_COOKIE_MESSAGE = "adragon-owner-mode:v1";

export function isLocalHost(host: string): boolean {
  return (
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("[::1]")
  );
}

export function getOwnerCookieValue(): string | null {
  const token = process.env.OWNER_MODE_TOKEN;

  if (!token) {
    return null;
  }

  const signature = createHmac("sha256", token)
    .update(OWNER_COOKIE_MESSAGE)
    .digest("hex");

  return `v1.${signature}`;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function hasValidOwnerCookie(value?: string): boolean {
  const expectedValue = getOwnerCookieValue();

  if (!value || !expectedValue) {
    return false;
  }

  return safeEqual(value, expectedValue);
}

export async function canUseOwnerTools(): Promise<boolean> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const host = headerStore.get("host") ?? "";

  return (
    isLocalHost(host) ||
    hasValidOwnerCookie(cookieStore.get(OWNER_COOKIE)?.value)
  );
}

export function canUseOwnerApi(request: NextRequest): boolean {
  const host = request.headers.get("host") ?? "";

  return (
    isLocalHost(host) ||
    hasValidOwnerCookie(request.cookies.get(OWNER_COOKIE)?.value)
  );
}
