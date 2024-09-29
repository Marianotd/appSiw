import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import CustomButton from '../login-register/CustomButton';
import InputList from '../list/InputList';
import { updateInvoice } from '../../service/invoces';

export default function EditInvoiceModal({ closeModal, invoiceToEdit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: '', validationError: [] })
  const inputList = ['number', 'client', 'date', 'total']

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: invoiceToEdit
  })

  useEffect(() => {
    if (invoiceToEdit) {
      reset(invoiceToEdit)
    }
    reset(invoiceToEdit)
  }, [invoiceToEdit, reset])

  const onSubmit = async (data) => {
    let { date } = data
    let formattedDate = date.replace('T', ' ')

    try {
      setLoading(true)
      await updateInvoice({ ...data, date: formattedDate }, invoiceToEdit.number)
      closeModal()
    } catch (error) {
      setError(error.response.data)
      console.error('Hubo un error al editar factura:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='absolute w-full h-full flex items-center justify-center left-0 top-0 bg-black/25 px-[5%]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-[#444] flex flex-col justify-center items-center gap-10 rounded-xl w-full md:w-3/4 lg:w-4/6 shadow-lg p-6"
      >
        <div className='w-full flex justify-between items-center'>
          <h2 className='text-2xl text-center font-bold'>
            Cargar nueva factura
          </h2>

          <button
          type='button'
            onClick={closeModal}
            className='text-3xl text-[#A6A6A6] hover:text-[#444] ease-out duration-300'
          >
            <IoMdClose />
          </button>
        </div>

        <InputList
          inputs={inputList}
          register={register}
          watch={watch}
          errors={errors}
          isInvoice={true}
        />

        <div className='w-full flex flex-col items-center gap-2'>
          {error.isError && (<p className='text-red-500'>{error.message}</p>)}
          {error.validationsError && error.validationsError.length > 0 && (
            error.validationsError.map(newErr => (
              <p className='text-red-500 text-sm'>{newErr}</p>
            ))
          )}

          <CustomButton text={!loading ? 'Completar edición' : 'Cargando...'} />
        </div>
      </form>
    </div>
  )
}
