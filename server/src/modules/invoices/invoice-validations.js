import { z } from 'zod'

const invoiceSchema = z.object({
  number: z.number().positive('El número de factura debe ser un número positivo'),
  client: z.string().min(3, 'El cliente es obligatorio'),
  date: z.string().refine((dateStr) => {
    return /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(dateStr);
  }, {
    message: 'Formato de fecha y hora incorrecto. Debe ser YYYY-MM-DD HH:MM',
  }).transform((dateStr) => new Date(dateStr)),
  total: z.number()
});

const invoiceNumberSchema = z.object({
  number: z.number().positive('El número de factura debe ser un número positivo')
});

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

export const validateInvoice = (invoice) => validateSchema(invoiceSchema, invoice);
export const validateInvoiceNumber = (invoiceNumber) => validateSchema(invoiceNumberSchema, invoiceNumber);

