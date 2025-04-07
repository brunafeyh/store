import { z } from "zod";

export const categoryFormSchema = z.object({
    name: z.string(),
    description: z.string(),
})

export type CategoryForm = z.infer< typeof categoryFormSchema>

export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Category = z.infer< typeof categorySchema>