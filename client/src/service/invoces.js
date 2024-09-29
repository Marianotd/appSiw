import axios from 'axios'
import { requestWithRetry } from './index'

const URI = import.meta.env.VITE_BACKEND_URL

export const createInvoice = async (invoiceData) => {
  return await requestWithRetry(async () => {
    const newInvoice = await axios.post(`${URI}/invoices`, invoiceData)
    return newInvoice.data
  })
}

export const updateInvoice = async (invoice, number) => {
  return await requestWithRetry(async () => {
    const updatedInvoice = await axios.put(`${URI}/invoices/${number}`, invoice)
    return updatedInvoice.data
  })
}

export const deleteInvoice = async (number) => {
  return await requestWithRetry(async () => {
    await axios.delete(`${URI}/invoices/${number}`)
  })
}

export const getInvoice = async (number) => {
  return await requestWithRetry(async () => {
    const invoice = await axios.get(`${URI}/invoices/${number}`)
    return invoice.data
  })
}

export const getAllInvoices = async () => {
  return await requestWithRetry(async () => {
    const invoices = await axios.get(`${URI}/invoices`)
    return invoices.data
  })
}