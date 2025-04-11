import { z } from "zod";

export const simpleItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    imageUrls: z.array(z.string()),
    stock: z.number()
})

export type SimpleItem = z.infer<typeof simpleItemSchema>

export const categoryFormSchema = z.object({
    name: z.string(),
    description: z.string(),
})

export type CategoryForm = z.infer<typeof categoryFormSchema>

export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    items: z.array(simpleItemSchema)
})

export type Category = z.infer<typeof categorySchema>


export const filterCategorySchema = z.object({
    name: z.string(),
})

export type FilterCategoryParamns = z.infer<typeof filterCategorySchema>