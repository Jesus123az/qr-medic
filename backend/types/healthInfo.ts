import {z} from "zod";
import { healthFormSchema } from "../validators/healthInfo";

export type HealthInfo = z.infer<typeof healthFormSchema> & {_id: string};
