import { z } from "zod";
import { healthFormSchema } from "./healthInfo";

export const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    profileImage: z.string(),
    healthInfo: healthFormSchema.optional(),
})
