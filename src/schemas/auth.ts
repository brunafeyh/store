import { z } from "zod"

export const roleSchema = z.enum(['CLIENT', 'EMPLOYEE', 'ADMIN'])

export type Role = z.infer<typeof roleSchema>

export const createAccountSchema = z
    .object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        confirmPassword: z.string().min(6, "Confirmação obrigatória"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    })

export type CreateAccountFormData = z.infer<typeof createAccountSchema>

export const createAccountDataSchema = z
    .object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        role: roleSchema
    })

export type CreateAccountSubmitFormData = z.infer<typeof createAccountDataSchema>

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export type LoginFormData = z.infer<typeof loginSchema>