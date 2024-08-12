import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/db/connect";
import { getUserByEmail } from "@/backend/services/user"; // Function to find user by email
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Find the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT
    const token = await new SignJWT({ id: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h") // Token valid for 2 hours
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // Set the JWT as a cookie
    const response = NextResponse.json(user, { status: 200 });
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 2 * 60 * 60, // 2 hours
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
