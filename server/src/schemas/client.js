import { z } from 'zod'

const createClientSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().email(),
  phone: z.number().min(1000000000)
})

const updateClientSchema = z.object({
  first_name: z.string().min(3).optional(),
  last_name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.number().min(1000000000).optional()
})

const validateCreateClientSchema = (data) => {
  return createClientSchema.parse(data)
}

const validateUpdateClientSchema = (data) => {
  return updateClientSchema.parse(data)
}

export { validateCreateClientSchema, validateUpdateClientSchema }
