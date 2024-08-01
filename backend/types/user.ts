import {z} from "zod";

import { userSchema } from "../validators/user";


export type User = z.infer<typeof userSchema>;