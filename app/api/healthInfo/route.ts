import { NextResponse } from "next/server";


export async function GET(){
   return NextResponse.json("Hello", {status: 200})
}