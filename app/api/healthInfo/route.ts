import { connectDB } from "@/backend/db/connect";
import { getHealthInfo } from "@/backend/services/healthInfo";
import { NextResponse } from "next/server";


export async function GET(){
   try{
      await connectDB();
      const healthInfo = getHealthInfo();
      return NextResponse.json(healthInfo, {status: 200})
   }catch(err){
      return NextResponse.json({error: err}, {status: 400})
   }
}