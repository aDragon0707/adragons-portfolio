import { NextRequest, NextResponse } from "next/server";
import { OWNER_COOKIE, getOwnerCookieValue } from "@/lib/owner-mode";

export function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const expectedToken = process.env.OWNER_MODE_TOKEN;
  const redirectTo = new URL("/zh", request.url);

  if (!expectedToken || token !== expectedToken) {
    return new NextResponse("Owner mode denied.", { status: 401 });
  }

  const cookieValue = getOwnerCookieValue();
  if (!cookieValue) {
    return new NextResponse("Owner mode is not configured.", { status: 500 });
  }

  const response = NextResponse.redirect(redirectTo);
  response.cookies.set(OWNER_COOKIE, cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
