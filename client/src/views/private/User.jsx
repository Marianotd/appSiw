import React from 'react'
import InputList from '../../components/list/InputList'
import { useForm } from 'react-hook-form'

export default function User() {
  const inputList = ['first_name', 'last_name', 'email', 'password']
  const { register, handleSubmit, watch, formState: { errors } } = useForm()


  return (
    <section className='flex flex-col gap-6 items-center py-6 px-4 h-full'>
      <h1 className='text-4xl font-bold'>Datos de usuario</h1>

      <form>
        <InputList
          inputs={inputList}
          register={register}
          watch={watch}
          errors={errors}
        />
      </form>
    </section>
  )
}
