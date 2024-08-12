import { getHealthInfoById, getHealthInfoByUserId } from "@/backend/services/healthInfo";
import { getUserByID } from "@/backend/services/user";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    id: string;
}

export async function GET(req: NextRequest, {params}: {params: Params}){
    try{
        const {id} = params
        const user = await getUserByID(id)
        if(!user?.healthInfo) return NextResponse.json({message: "HealthInfo Does not exist"}, {status: 404})
        const healthInfo = await getHealthInfoById(user?.healthInfo._id)
        return NextResponse.json(healthInfo, {status: 200})
    }catch(err){
        return NextResponse.json({error: err}, {status: 400})
    }
}