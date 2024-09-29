import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import InputList from '../../components/list/InputList';
import CustomButton from '../../components/login-register/CustomButton';
import { resetPassword } from '../../service';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ isError: false, message: '', validationError: [] })
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const inputList = ['new_password', 'confirm_password']
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const token = searchParams.get('token')

      if (!token) {
        console.error('Error al obtener token')
        setError({ isError: true, message: 'Error al obtener token de restablecimiento', validationError: [] })
      }

      const payload = {
        token,
        password: data.new_password,
        confirm_password: data.confirm_password
      }

      const response = await resetPassword(payload)
      if (!response.iError) {
        navigate('/auth/login')
      }
    } catch (error) {
      setError(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white min-h-1/2 flex flex-col items-center justify-center gap-4 rounded-xl w-96 shadow-lg p-6"
    >

      <p className="font-bold px-4 text-2xl">
        Restablecer Contraseña
      </p>

      <p className="font-bold px-4 text-lg">
        Ingresa tu nueva contraseña
      </p>

      <InputList
        inputs={inputList}
        register={register}
        watch={watch}
        errors={errors}
      />

      <div>
        <span>Volver a</span>
        <Link
          className="ml-1 text-blue-400 underline underline-offset-auto"
          to={'/auth/login'}
        >
          inicio de sesión
        </Link>
      </div>

      {error.isError && (<p className='text-red-500'>{error.message}</p>)}
      {error.validationsError && error.validationsError.length > 0 && (
        error.validationsError.map(newErr => (
          <p className='text-red-500 text-sm'>{newErr}</p>
        ))
      )}

      <CustomButton text={loading ? 'Confirmando...' : 'Confirmar'} />
    </form>
  )
}
