import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEdit } from "react-icons/fi";
import { useAppStore } from '../../context/useAppStore';
import InputList from '../../components/list/InputList'
import UserDetail from '../../components/user/UserDetail';
import CustomButton from '../../components/login-register/CustomButton';

export default function User() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { userDetail } = useAppStore()

  const inputList = ['first_name', 'last_name', 'email', 'prev_password', 'new_password']
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: userDetail
  })

  useEffect(() => {
    setLoading(false)
    watch()
  }, [userDetail])

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <section className='flex flex-col gap-6 items-center py-6 px-4 h-full'>
      <h1 className='text-4xl font-bold'>Datos de usuario</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-8'
      >
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-fit px-4 py-2 flex items-center justify-center gap-4 self-end text-xl border border-[#A6A6A6] rounded-xl bg-[#A6A6A6] hover:bg-[#444] text-white hover:shadow-lg font-bold tracking-wide ease-out duration-300"
        >
          <FiEdit /> Editar
        </button>

        <div className='flex flex-col gap-8 w-full lg:w-2/3 mx-auto'>
          {
            isEditing ? (
              <>
                <InputList
                  inputs={inputList}
                  register={register}
                  watch={watch}
                  errors={errors}
                  isProfile={true}
                  isEditing={isEditing}
                />

                <CustomButton text={!loading ? 'Confirmar datos' : 'Guardando...'} />
              </>
            ) : (
              <UserDetail
                user={userDetail}
              />
            )
          }
        </div>
      </form>
    </section>
  )
}
