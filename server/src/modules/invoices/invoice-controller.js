import Invoice from './Invoice.js'
import { validateInvoice, validateInvoiceNumber } from './invoice-validations.js'

export const createInvoice = async (req, res) => {
  const { number, client, date, total } = req.body

  const validation = validateInvoice({ number: Number(number), client, date, total: Number(total) })

  if (validation.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', validationsError: validation.error.map(err => err.message) })
  }

  const newInvoice = { number, client, date, total }

  try {
    const existInvoice = await Invoice.findOne({ where: { number } })

    if (existInvoice) {
      return res.status(400).json({ isError: true, message: `Ya existe una factura con el N° ${number}` })
    }

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

  const validation = validateInvoiceNumber({ number: Number(number) });


  if (validation.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', validationsError: validation.error.map(err => err.message) })
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

  const validation = validateInvoice({ number: Number(req.body.number), client, date, total: Number(total) })

  if (validation.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', validationsError: validation.error.map(err => err.message) })
  }

  const newInvoice = { number: req.body.number, client, date, total }

  try {
    if (number != req.body.number) {
      const invoiceDb = await Invoice.findOne({ where: { number: newInvoice.number } })

      if (invoiceDb) {
        return res.status(400).json({ isError: true, message: `Operación no permitida, ya existe una factura con el N° ${number}` });
      }
    }

    const updatedInvoice = await Invoice.update(newInvoice, { where: { number: number } })

    res.status(200).json({ isError: false, message: `Actualización exitosa de factura n° ${number}`, data: updatedInvoice })
  } catch (error) {
    console.error('Error al actualizar factura:', error)
    res.status(400).json({ isError: true, message: `Error al actualizar factura n° ${number}` })
  }
}

export const deleteInvoice = async (req, res) => {
  const { number } = req.params

  const validation = validateInvoiceNumber({ number: Number(number) });

  if (validation.isError) {
    return res.status(400).json({ isError: true, message: 'Error de validación de datos', validationsError: validation.error.map(err => err.message) })
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
