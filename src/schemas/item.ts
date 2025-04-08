import { z } from "zod";
import { categorySchema } from "./categories";
import { brandSchema } from "./brand";

export const itemFormSchema = z.object({
    sku: z.string(),
    name: z.string(),
    description: z.string(),
    imageUrls: z.array(z.string()),
    price: z.number(),
    stock: z.number(),
    categoryId: z.string(),
    brandId: z.string()
})

export type ItemForm = z.infer<typeof itemFormSchema>

export const itemSchema = z.object({
    id: z.string(),
    sku: z.string(),
    name: z.string(),
    description: z.string(),
    imageUrls: z.array(z.string()),
    price: z.number(),
    stock: z.number(),
    category: categorySchema,
    brand: brandSchema
})

export type Item = z.infer<typeof itemSchema>

export const filterItemSchema = z.object({
    name: z.string(),
    brandId: z.string(),
    categoryId: z.string()
})

export type FilterItemParamns = z.infer<typeof filterItemSchema>