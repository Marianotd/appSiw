import axios from 'axios'

const URI = import.meta.env.VITE_BACKEND_URL

export const createInvoice = async (invoiceData) => {
  const newInvoice = await axios.post(`${URI}/invoices`, invoiceData)
  return newInvoice.data
}

export const updateInvoice = async (invoice, number) => {
  const updatedInvoice = await axios.put(`${URI}/invoices/${number}`, invoice)
  return updatedInvoice.data
}

export const deleteInvoice = async (number) => {
  await axios.delete(`${URI}/invoices/${number}`)
}

export const getInvoice = async (number) => {
  const invoice = await axios.get(`${URI}/invoices/${number}`)
  return invoice.data
}

export const getAllInvoices = async () => {
  const invoices = await axios.get(`${URI}/invoices`)
  return invoices.data
}