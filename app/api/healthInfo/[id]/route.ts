import { connectDB } from "@/backend/db/connect";
import { createHealthInfo, updateHealthInfo } from "@/backend/services/healthInfo";
import { getUserByID, updateUserhealthInfo } from "@/backend/services/user";
import { User } from "@/backend/types/user";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        id: string
    }
}


// export async function GET(req: NextRequest, {params}: Params){
//     try{
//        await connectDB();
//        const id = params.id
//         const user = await getUserByID(id)
//         if(!user){
//             throw new Error("User does not exist")
//         }
//        const healthInfo = getHealthInfo();
//        return NextResponse.json(healthInfo, {status: 200})
//     }catch(err){
//        return NextResponse.json({error: err}, {status: 400})
//     }
//  }

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
        const user = await getUserByID(id) as User
        const healthInfoId = user?.healthInfo? user?.healthInfo._id: ""
        const healthInfo = await req.json()
        const newHealthInfo = updateHealthInfo(healthInfoId, healthInfo)
        return NextResponse.json(newHealthInfo, {status: 200})
    }catch(err){
        return NextResponse.json({error: err}, {status: 400})
    }
}