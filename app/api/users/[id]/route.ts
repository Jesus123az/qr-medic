import { connectDB } from "@/backend/db/connect";
import { deleteUser, getUserByEmail, getUserByID } from "@/backend/services/user";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import admin from "@/utils/firebase/admin";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const user = await getUserByID(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json("error " + err, { status: 400 });
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const { idToken } = await req.json();
    if (!idToken) {
       return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email as string;
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const userRecord = await admin.auth().getUserByEmail(email);
    await deleteUser(id);
    await admin.auth().deleteUser(userRecord.uid);
    
    const response = NextResponse.json(
      { message: "Delete successful" },
      { status: 200 }
    );
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 0, // Invalidate the cookie immediately
    });

    return response;
  } catch (err) {
    return NextResponse.json("error " + err, { status: 400 });
  }
}
