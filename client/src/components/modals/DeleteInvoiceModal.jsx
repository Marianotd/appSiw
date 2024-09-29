import React, { useState } from 'react'
import { deleteInvoice } from '../../service/invoces'

export default function DeleteInvoiceModal({ closeModal, invoiceToDelete }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteInvoice(invoiceToDelete.number)
      closeModal()
    } catch (error) {
      console.error('Hubo un error al editar factura:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='absolute w-full h-full flex items-center justify-center left-0 top-0 bg-black/25 px-[5%]'>
      <div className='bg-white h-1/2 flex flex-col items-center justify-around p-4 rounded-xl border border-[#444]'>
        <h2 className='text-2xl text-center font-bold w-2/3'>
          Está seguro que desea eliminar la factura con n° {invoiceToDelete.number}
        </h2>

        <div className='grid grid-cols-2 gap-6'>
          <button
          type='button'
            className="border border-[#A6A6A6] rounded-xl py-2 px-6 text-center bg-[#A6A6A6] hover:bg-white text-white hover:text-[#444] hover:shadow-lg font-bold tracking-wide ease-out duration-300"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className="border border-[#444] rounded-xl py-2 px-6 text-center bg-[#A6A6A6] hover:bg-[#444] text-white hover:shadow-lg font-bold tracking-wide ease-out duration-300"
            onClick={handleDelete}
          >
            {loading ? 'Eliminando' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  )
}
