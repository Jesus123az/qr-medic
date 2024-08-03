import { connectDB } from "@/backend/db/connect";
import { getUserByID } from "@/backend/services/user";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, {params} : {params: {id: string}}){
    try{
        await connectDB();
        const id = params.id
        const user = await getUserByID(id) 
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})    
        }
        return NextResponse.json(user, {status: 200})
    }catch(err){
        return NextResponse.json("error " + err, {status: 400})
    }
}