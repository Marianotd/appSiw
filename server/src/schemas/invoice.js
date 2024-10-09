import { z } from 'zod'

const invoiceSchema = z.object({
  numer: z.number().positive(),
  client: z.string().min(3),
  date: z.date(),
  total: z.number().positive()
})

const validateInvoiceSchema = (data) => {
  return invoiceSchema.parse(data)
}

export { validateInvoiceSchema }
