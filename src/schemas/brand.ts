import { z } from "zod";

export const brandFormSchema = z.object({
    name: z.string(),
    description: z.string()
})

export type BrandForm = z.infer<typeof brandFormSchema>

export const brandSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Brand = z.infer<typeof brandFormSchema>