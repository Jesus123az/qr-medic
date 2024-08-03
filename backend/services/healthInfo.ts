import HealthInfo from "../models/healthInfo";
import User from "../models/user";
import { HealthInfo as HealthInfoType } from "../types/healthInfo";

export const createHealthInfo = (
  healthInfo: HealthInfoType & { _id: string },
  userId: string
) => {
    const info = HealthInfo.create(healthInfo);
    User.findByIdAndUpdate(userId, { healthInfo: healthInfo._id });
    return info
};

export const updateHealthInfo = (
  id: string,
  healthInfo: HealthInfoType
) => {
  
  HealthInfo.findByIdAndUpdate(id, healthInfo);
};
