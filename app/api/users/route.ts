import { NextRequest, NextResponse } from "next/server";
import { createUser, getUsers } from "@/backend/services/user";
import { connectDB } from "@/backend/db/connect";
import { userSchema } from "@/backend/validators/user";
import bcrypt from "bcrypt";
import { User } from "@/backend/types/user";

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
    console.log(user);
    userSchema.parse(user);
    bcrypt.hash(user.password, saltRounds, async function (err, hash) {
      user.password = hash;
      const newUser = await createUser(user);
      return NextResponse.json(newUser, { status: 200 });
    });
    return NextResponse.json("success", { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 400 });
  }
}
