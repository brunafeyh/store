import { z } from "zod";
import { simpleItemSchema } from "./categories";

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
    updatedAt: z.string(),
    items: z.array(simpleItemSchema)
})

export type Brand = z.infer<typeof brandSchema>

export const filterBrandSchema = z.object({
    name: z.string(),
})

export type FilterBrandParamns = z.infer<typeof filterBrandSchema>