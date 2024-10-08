import { connectDB } from "@/backend/db/connect";
import { createHealthInfo, getHealthInfoById, updateHealthInfo } from "@/backend/services/healthInfo";
import { getUserByID, updateUserhealthInfo } from "@/backend/services/user";
import { User } from "@/backend/types/user";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        id: string
    }
}


export async function GET(req: NextRequest, {params}: Params){
    try{
       await connectDB();
       const id = params.id
       const healthInfo = await getHealthInfoById(id);
       return NextResponse.json(healthInfo, {status: 200})
    }catch(err){
       return NextResponse.json({error: err}, {status: 400})
    }
 }

export async function POST(req: NextRequest, {params}: Params){
    try{
        await connectDB();
        const id = params.id
        const user = await getUserByID(id)
        if(!user){
            throw new Error("User does not exist")
        }
        const healthInfo = await req.json()
        const newHealthInfo = await createHealthInfo(healthInfo, id);
        const updatedUser = await updateUserhealthInfo(user.id, newHealthInfo.id)
        return NextResponse.json({updatedUser, healthId: newHealthInfo._id}, {status: 200})
    }catch(err){
        return NextResponse.json({error: err}, {status: 400})
    }
}


export async function PUT(req: NextRequest, {params}: Params){
    try{
        await connectDB();
        const id = params.id
        console.log("1")
        const user = await getUserByID(id) as User
        console.log("2")
        const healthInfoId = user?.healthInfo? user?.healthInfo._id: ""
        const healthInfo = await req.json()
        const newHealthInfo = await updateHealthInfo(healthInfoId, healthInfo)
        console.log("3")
        return NextResponse.json(newHealthInfo, {status: 200})
    }catch(err){
        return NextResponse.json({error: err}, {status: 400})
    }
}