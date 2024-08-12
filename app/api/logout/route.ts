import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 0, // Invalidate the cookie immediately
  });

  return response;
}
