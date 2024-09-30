import React, { useEffect, useMemo, useState } from 'react'
import { TbFileInvoice } from "react-icons/tb";
import { createInvoice, getAllInvoices } from '../../service/invoces'
import dayjs from 'dayjs';
import CustomLoader from '../../components/loading/CustomLoader'
import SearchTool from '../../components/invoices/SearchTool'
import CreateInvoiceModal from '../../components/modals/CreateInvoiceModal';
import TableHead from '../../components/invoices/TableHead';
import TableBody from '../../components/invoices/TableBody';
import DeleteInvoiceModal from '../../components/modals/DeleteInvoiceModal';
import EditInvoiceModal from '../../components/modals/EditInvoiceModal';

export default function Invoices() {
  const [searchValue, setSeartchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ isError: false, message: '', validationError: [] })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [invoices, setInvoices] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const invoiceHead = [
    { invField: 'number', description: 'Número' },
    { invField: 'client', description: 'Cliente' },
    { invField: 'date', description: 'Fecha' },
    { invField: 'total', description: 'Importe' },
  ]

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data } = await getAllInvoices()
      setInvoices(data)
    }

    fetchInvoices()
  }, [showModal, showEditModal, showDeleteModal])

  const filteredInvoices = useMemo(() => {
    if (!searchValue) return invoices
    return invoices.filter(({ number, client, date, total }) =>
      number.toString().includes(searchValue) ||
      client.toLowerCase().includes(searchValue.toLowerCase()) ||
      dayjs(date).format('DD/MM/YYY HH:mm').includes(searchValue) ||
      total.toString().includes(searchValue)
    )
  }, [searchValue, invoices])

  const handleInput = (e) => setSeartchValue(e.target.value)

  const handleSort = (key) => {
    let direction = 'asc'

    if (sortConfig.key === key && sortConfig.direction === direction) {
      direction = 'desc'
    }

    setSortConfig({ key, direction })

    const sortedInvoices = [...invoices].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setInvoices(sortedInvoices)
  }

  const handleCreateInvoice = async (newInvoice) => {
    try {
      const response = await createInvoice(newInvoice)
      setShowModal(false)
      return response
    } catch (error) {
      console.error(error)
      setError(error.response.data)
    } finally {
      setTimeout(() => {
        setError({ isError: false, message: '', validationError: [] })
      }, 3000);
    }
  }

  const handleEditInvoice = async (invoice) => {
    const formattedDate = dayjs(invoice.date).format("YYYY-MM-DDThh:mm")
    setSelectedInvoice({ ...invoice, date: formattedDate })
    setShowEditModal(true)
  }

  const handleDeleteInvoice = async (invoice) => {
    setSelectedInvoice(invoice)
    setShowDeleteModal(true)
  }

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return true
    }
    return false
  }

  if (loading) {
    return <CustomLoader loading={loading} />
  }

  return (
    <section className='flex flex-col gap-6 items-center py-6 px-4 h-full'>
      <h1 className='text-4xl font-bold'>Facturas</h1>

      <div className='flex flex-col items-center lg:flex-row justify-between gap-6 w-3/4 md:w-1/2 lg:w-full'>
        <button
          className='flex gap-2 items-center border border-[#A6A6A6] rounded-xl py-2 px-4 text-center text-xl bg-[#A6A6A6] hover:bg-[#444] text-white hover:shadow-lg font-bold tracking-wide ease-out duration-300'
          onClick={() => setShowModal(true)}
        >
          <TbFileInvoice /> Cargar factura
        </button>

        <SearchTool
          searchValue={searchValue}
          handleInput={handleInput}
        />
      </div>

      <div className="relative w-full overflow-x-auto rounded-xl">
        <table className='w-full bg-black/5'>
          <TableHead
            fields={invoiceHead}
            handleSort={handleSort}
            renderSortIcon={renderSortIcon}
          />

          {
            invoices && invoices.length > 0 ? (
              <TableBody
                invoices={filteredInvoices}
                editFunction={handleEditInvoice}
                deleteFuntion={handleDeleteInvoice}
              />
            ) : (
              <tbody>
                <tr>
                  <td colSpan='6' className='h-[500px] text-center text-xl font-bold'>
                    Aun no hay facturas cargadas
                  </td>
                </tr>
              </tbody>
            )
          }

        </table>
      </div>

      {
        showModal && (
          <CreateInvoiceModal
            closeModal={() => setShowModal(false)}
            createInvoice={handleCreateInvoice}
            formError={error}
          />
        )
      }

      {
        showEditModal && (
          <EditInvoiceModal
            closeModal={() => setShowEditModal(false)}
            invoiceToEdit={selectedInvoice}
          />
        )
      }

      {
        showDeleteModal && (
          <DeleteInvoiceModal
            closeModal={() => setShowDeleteModal(false)}
            invoiceToDelete={selectedInvoice}
          />
        )
      }
    </section >
  )
}
