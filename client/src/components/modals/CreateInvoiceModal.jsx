import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdClose } from "react-icons/io";
import InputList from '../list/InputList'
import CustomButton from '../login-register/CustomButton'

export default function CreateInvoiceModal({ closeModal, createInvoice, formError }) {
  const [loading, setLoading] = useState(false)
  const inputList = ['number', 'client', 'date', 'total']

  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    let { date } = data
    let formattedDate = date.replace('T', ' ')

    setLoading(true)
    await createInvoice({ ...data, date: formattedDate })
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
          {formError.isError && (<p className='text-red-500'>{formError.message}</p>)}
          {formError.validationsError && formError.validationsError.length > 0 && (
            formError.validationsError.map(newErr => (
              <p className='text-red-500 text-sm'>{newErr}</p>
            ))
          )}

          <CustomButton text={!loading ? 'Completar carga' : 'Cargando...'} />
        </div>
      </form>
    </div>
  )
}
