import HealthInfo from "../models/healthInfo";
import User from "../models/user";
import { HealthInfo as HealthInfoType } from "../types/healthInfo";


export const getHealthInfo = ()=>HealthInfo.find()
export const getHealthInfoById = (id: string)=>HealthInfo.findById(id)
export const createHealthInfo = (
  healthInfo: HealthInfoType & { _id: string },
  userId: string
) => {
    const info = HealthInfo.create(healthInfo);
    return info
};

export const updateHealthInfo = (
  id: string,
  healthInfo: HealthInfoType
) => HealthInfo.findByIdAndUpdate(id, healthInfo);
;

export const getHealthInfoByUserId = async (id: string) => {
  try{
    const user = await User.findById(id).populate("healthInfo");
    return user?.healthInfo
  }catch(err){
    console.error(err);
  }
};
