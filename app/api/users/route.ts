import { NextRequest, NextResponse } from "next/server";
import { createUser, getUsers } from "@/backend/services/user";
import { connectDB } from "@/backend/db/connect";
import { userSchema } from "@/backend/validators/user";
import bcrypt from "bcrypt";
import { User } from "@/backend/types/user";
import { sign } from "@/backend/middlewares/jose";
import { nanoid } from "nanoid";

const saltRounds = 10;

export async function GET() {
  try {
    await connectDB();
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    let user = (await req.json()) as User;

    // Validate the user data
    userSchema.parse(user);

    // Hash the user's password
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;

    // Create the user in the database
    const newUser = await createUser(user);

    // Sign the JWT
    const token = await  sign({ id: newUser._id.toString() })
    // Set the JWT as a cookie
    const response = NextResponse.json(newUser, { status: 200 });
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 10, // 10 days
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 400 });
  }
}
