import { connectDB } from "@/backend/db/connect";
import { deleteUser, getUserByID } from "@/backend/services/user";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

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
export async function DELETE(
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
    await deleteUser(id);
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
