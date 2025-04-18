import { z } from "zod"
import { roleSchema } from "./auth"

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: roleSchema
})

export type User = z.infer<typeof userSchema>