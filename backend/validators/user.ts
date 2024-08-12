import { z } from "zod";
import { healthFormSchema } from "./healthInfo";

export const userSchema = z.object({
    _id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    healthInfo: healthFormSchema.optional(),
    qrCodeGenerated: z.boolean().optional().default(false),
})
