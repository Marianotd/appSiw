import { Router } from 'express'
import { createInvoice, deleteInvoice, getAllInvoices, getInvoice, updateInvoice } from '../modules/invoices/invoice-controller.js'

const router = Router()

router
  .post('/', createInvoice)
  .get('/', getAllInvoices)
  .get('/:number', getInvoice)
  .put('/:number', updateInvoice)
  .delete('/:number', deleteInvoice)

export default router
