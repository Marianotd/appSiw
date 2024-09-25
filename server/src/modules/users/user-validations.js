import { z } from 'zod'

const firstNameSchema = z.string().min(3)
const lastNameSchema = z.string().min(3, 'El apellido debe tener al menos 3 caracteres')
const emailSchema = z.string().email('Correo electrónico inválido')
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
    return { isError: false }
  } catch (error) {
    console.error('Error de validación:', error.message)
    return {
      isError: true,
      error: error
    }
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

export const validateRegister = (user) => {
  try {
    registerSchema.parse(user)
    return { isError: false }
  } catch (error) {
    console.error('Error de validación:', error.errors)
    return {
      isError: true,
      error: error.errors
    }
  }
}

export const validateLogin = (user) => {
  const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  })
  return validateSchema(loginSchema, user)
}

export const validateUpdate = (user) => {
  const updateSchema = z.object({
    first_name: firstNameSchema,
    last_name: lastNameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  return validateSchema(updateSchema, user)
}
