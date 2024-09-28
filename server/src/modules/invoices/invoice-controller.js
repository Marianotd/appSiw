import Invoice from './Invoice.js'
import { validateInvoice, validateInvoiceNumber } from './invoice-validations.js'

export const createInvoice = async (req, res) => {
  const { client, date, total } = req.body

  const validation = validateInvoice({ client, date, total })

  if (validation.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', error: validation.error })
  }

  const newInvoice = { client, date, total }

  try {
    const invoiceDb = await Invoice.create(newInvoice)

    res.status(200).json({ isError: false, message: 'Factura creada con éxito', data: invoiceDb })
  } catch (error) {
    console.error('Error al crear factura:', error)
    res.status(400).json({ isError: true, message: 'Error al crear factura' })
  }
}
export const getAllInvoices = async (req, res) => {
  try {
    const invoicesDb = await Invoice.findAll()

    res.status(200).json({ isError: false, message: 'Lectura de facturas éxitosa', data: invoicesDb })
  } catch (error) {
    console.error('Error al leer facturas:', error)
    res.status(400).json({ isError: true, message: 'Error al leer facturas' })
  }
}
export const getInvoice = async (req, res) => {
  const { number } = req.params

  const validation = validateInvoiceNumber({ number });

  if (!validation.success) {
    return res.status(400).json({
      isError: true,
      message: 'Error de validación',
      errors: validation.error.errors.map(err => err.message)
    });
  }

  try {
    const invoiceDb = await Invoice.findOne({ where: { number } })

    if (!invoiceDb) {
      return res.status(404).json({ isError: true, message: `Factura n° ${number} no encontrada` });
    }

    res.status(200).json({ isError: false, message: `Lectura exitosa de factura n° ${number}`, data: invoiceDb })
  } catch (error) {
    console.error('Error al leer factura:', error)
    res.status(400).json({ isError: true, message: `Error al leer factura n° ${number}` })
  }
}
export const updateInvoice = async (req, res) => {
  const { number } = req.params
  const { client, date, total } = req.body

  const validation = validateInvoice({ number, client, date, total })

  if (!validation.success) {
    return res.status(400).json({
      isError: true,
      message: 'Error de validación de datos',
      errors: validation.error.errors.map(err => err.message)
    });
  }

  const newInvoice = { number, client, date, total }

  try {
    const invoiceDb = await Invoice.findOne({ where: { number } })

    if (!invoiceDb) {
      return res.status(404).json({ isError: true, message: `Factura n° ${number} no encontrada` });
    }

    const updatedInvoice = await invoiceDb.update(newInvoice)

    res.status(200).json({ isError: false, message: `Actualización exitosa de factura n° ${number}`, data: updatedInvoice })
  } catch (error) {
    console.error('Error al actualizar factura:', error)
    res.status(400).json({ isError: true, message: `Error al actualizar factura n° ${number}` })
  }
}
export const deleteInvoice = async (req, res) => {
  const { number } = req.params

  const validation = validateInvoiceNumber({ number });

  if (!validation.success) {
    return res.status(400).json({
      isError: true,
      message: 'Error de validación',
      errors: validation.error.errors.map(err => err.message)
    });
  }

  try {
    const invoiceDb = await Invoice.findOne({ where: { number } })

    if (!invoiceDb) {
      return res.status(404).json({ isError: true, message: `Factura n° ${number} no encontrada` });
    }

    await Invoice.destroy({ where: { number } })

    res.status(200).json({ isError: false, message: `Borrado exitoso de factura n° ${number}` })
  } catch (error) {
    console.error('Error al eliminar factura:', error)
    res.status(400).json({ isError: true, message: `Error al eliminar factura n° ${number}` })
  }
}
