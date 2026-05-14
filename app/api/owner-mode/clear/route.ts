import { NextResponse } from "next/server";
import { OWNER_COOKIE } from "@/lib/owner-mode";

export function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/zh", request.url));
  response.cookies.set(OWNER_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  return response;
}
