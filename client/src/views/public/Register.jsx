import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../service"
import InputList from "../../components/list/InputList"
import CustomButton from "../../components/login-register/CustomButton"
import SpinerFullScreen from "../../components/loading/SpinerFullScreen"

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ isError: false, message: '', validationsError: [] })
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const inputList = ['first_name', 'last_name', 'email', 'password', 'confirm_password']

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await registerUser(data)
      navigate('/auth/login')
    } catch (error) {
      setError(error.response.data)
      console.error('Error en el envío del formulario:', error);
    } finally {
      setLoading(false)
      setTimeout(() => {
        setError({ isError: false, message: '' })
      }, 3000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white h-3/4 flex flex-col justify-center gap-6 rounded-xl w-96 shadow-lg p-6"
    >
      <p className="font-bold text-center px-4 text-lg">
        Completa los siguientes campos
      </p>

      <InputList
        inputs={inputList}
        register={register}
        watch={watch}
        errors={errors}
      />

      <div className="flex flex-col items-center gap-2">
        <div>
          <span>¿Ya tienes cuenta?</span>
          <Link
            className="ml-1 text-blue-400 underline underline-offset-auto"
            to={'/auth/login'}
          >
            Iniciar sesión
          </Link>
        </div>

        {error.isError && (<p className='text-red-500 text-sm'>{error.message}</p>)}
        {error.validationsError && error.validationsError.length > 0 && (
          error.validationsError.map(newErr => (
            <p className='text-red-500 text-sm'>{newErr}</p>
          ))
        )}

        <CustomButton text={loading ? 'Registrando' : 'Registrarse'} />
      </div>

      <SpinerFullScreen loading={loading} />
    </form >
  )
}
