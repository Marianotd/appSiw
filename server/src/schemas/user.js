import { z } from 'zod'

const registerSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirm_passwrd: z.string().min(8)
}).refine((data) => data.password === data.confirm_passwrd, {
  message: "Passwords don't match",
  path: ['confirm_passwrd']
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const updateUserSchema = z.object({
  first_name: z.string().min(3).optional(),
  last_name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  confirm_passwrd: z.string().min(8).optional()
}).refine((data) => data.password === data.confirm_passwrd, {
  message: "Passwords don't match",
  path: ['confirm_passwrd']
})

const resetPasswordSchema = z.object({
  password: z.string().min(8),
  new_password: z.string().min(8)
})

const validateRegisterSchema = (data) => {
  return registerSchema.parse(data)
}

const validateLoginSchema = (data) => {
  return loginSchema.parse(data)
}

const validateUpdateSchema = (data) => {
  return updateUserSchema.parse(data)
}

const validateResetPasswordSchema = (schema, data) => {
  return resetPasswordSchema.parse(data)
}

export { validateRegisterSchema, validateLoginSchema, validateUpdateSchema, validateResetPasswordSchema }
