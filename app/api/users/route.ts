import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/backend/services/user";
import { connectDB } from "@/backend/db/connect";
import { userSchema } from "@/backend/validators/user";


export async function GET(){
    try{
        await connectDB();
        const users = await getUsers()
        return NextResponse.json(users, {status: 200} )
    }catch(err){
        return NextResponse.json({err}, {status: 400})
    }

}

export async function POST(req: NextRequest){
    try{
        const user = req.body;
        userSchema.parse(user)
        await connectDB();
        const users = await getUsers()
        return NextResponse.json(users, {status: 200} )
    }catch(err){
        return NextResponse.json({err}, {status: 400})
    }
}