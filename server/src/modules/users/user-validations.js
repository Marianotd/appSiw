import { z } from 'zod'

const firstNameSchema = z.string().min(3).refine((value) => /[aA-zZ]/.test(value), { message: 'El nombre solo debe incluir letras' })
const lastNameSchema = z.string().min(3).refine((value) => /[aA-zZ]/.test(value), { message: 'El apellido solo debe incluir letras' })
const emailSchema = z.string().email('Formato de correo electrónico inválido')
const passwordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .refine((value) => /[A-Z]/.test(value), {
    message: 'La contraseña debe tener al menos una letra mayúscula'
  })
  .refine((value) => /[a-z]/.test(value), {
    message: 'La contraseña debe tener al menos una letra minúscula'
  })
  .refine((value) => /\d/.test(value), {
    message: 'La contraseña debe tener al menos un número'
  })
  .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    message: 'La contraseña debe tener al menos un carácter especial'
  })

const validateSchema = (schema, data) => {
  try {
    schema.parse(data)
    return { isError: false, error: null }
  } catch (error) {
    console.error('Error de validación:', error.message)
    return { isError: true, error: error.errors }
  }
}

const registerSchema = z.object({
  first_name: firstNameSchema,
  last_name: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Las contraseñas no coinciden'
})

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

const updateSchema = z.object({
  first_name: firstNameSchema.optional(),
  last_name: lastNameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  new_password: passwordSchema.optional()
})

const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Las contraseñas no coinciden',
});

export const validateRegister = (user) => {
  return validateSchema(registerSchema, user)
}

export const validateLogin = (user) => {
  return validateSchema(loginSchema, user)
}

export const validateUpdate = (user) => {
  return validateSchema(updateSchema, user)
}

export const validateResetPassword = (user) => {
  return validateSchema(resetPasswordSchema, user)
}
