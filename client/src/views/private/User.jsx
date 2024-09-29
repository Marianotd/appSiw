import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit } from "react-icons/fi";
import { useAppStore } from '../../context/useAppStore';
import { updateUser } from '../../service';
import UserDetail from '../../components/user/UserDetail';
import CustomButton from '../../components/login-register/CustomButton';
import UserInputList from '../../components/list/UserInputList';

export default function User() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ isError: false, message: '', validationError: [] })
  const { userDetail, setUserDetail } = useAppStore()

  const inputList = ['first_name', 'last_name', 'email', 'password', 'new_password']
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: userDetail
  })

  useEffect(() => {
    if (userDetail) {
      reset(userDetail) 
    }
  }, [userDetail, reset])

  const onSubmit = async data => {
    try {
      setLoading(true)

      if (Object.keys(data).length === 0) {
        setError({ isError: true, message: 'No se han enviado datos', validationError: [] })
        setLoading(false)
        return
      }

      const response = await updateUser(data)
      if (!response.isError) {
        const { password, ...userData } = response.data
        setUserDetail(userData)
        setIsEditing(false)
        reset()
      }
    } catch (error) {
      setError(error.response.data)
      console.error('Error en el envío del formulario:', error);
    } finally {
      setLoading(false)
      setTimeout(() => {
        setError({ isError: false, message: '', validationError: [] })
      }, 3000)
    }
  }

  return (
    <section className='flex flex-col gap-6 items-center py-6 px-4 h-full'>
      <h1 className='text-4xl font-bold'>Datos de usuario</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-8'
      >
        <button
          type='button'
          onClick={() => setIsEditing(!isEditing)}
          className="w-fit px-4 py-2 flex items-center justify-center gap-4 self-end text-xl border border-[#A6A6A6] rounded-xl bg-[#A6A6A6] hover:bg-[#444] text-white hover:shadow-lg font-bold tracking-wide ease-out duration-300"
        >
          {isEditing ? 'Volver atrás' : <><FiEdit />Editar</>}
        </button>

        <div className='flex flex-col gap-8 items-center w-full lg:w-2/3 mx-auto'>

          {
            isEditing ? (
              <>
                <UserInputList
                  inputs={inputList}
                  register={register}
                  watch={watch}
                  errors={errors}
                />
              </>
            ) : (
              <UserDetail
                user={userDetail}
              />
            )
          }

          {error.isError && (<p className='text-red-500 text-sm'>{error.message}</p>)}
          {error.validationsError && error.validationsError.length > 0 && (
            error.validationsError.map(newErr => (
              <p className='text-red-500 text-sm'>{newErr}</p>
            ))
          )}

          {isEditing && (<CustomButton text={!loading ? 'Confirmar datos' : 'Guardando...'} />)}
        </div>
      </form>
    </section >
  )
}
