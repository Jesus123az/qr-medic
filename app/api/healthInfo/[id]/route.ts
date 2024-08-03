import { connectDB } from "@/backend/db/connect";
import { createHealthInfo, updateHealthInfo } from "@/backend/services/healthInfo";
import { getUserByID } from "@/backend/services/user";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        id: string
    }
}


export async function POST(req: NextRequest, {params}: Params){
    try{
        await connectDB();
        const id = params.id
        const healthInfo = await req.json()
        const newHealthInfo = await createHealthInfo(healthInfo, id);
        return NextResponse.json(newHealthInfo, {status: 200})
    }catch(err){
        return NextResponse.json({error: err}, {status: 400})
    }
}


export async function PUT(req: NextRequest, {params}: Params){
    try{
        await connectDB();
        const id = params.id
        const user = await getUserByID(id)
        // const healthInfoId = user?.healthInfo? user?.healthInfo._id: ""
        const healthInfo = await req.json()
        // const newHealthInfo = updateHealthInfo()
        return NextResponse.json("newHealthInfo", {status: 200})
    }catch(err){
        return NextResponse.json({error: err}, {status: 400})
    }
}