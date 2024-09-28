import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useAppStore } from "../../context/useAppStore"
import InputList from "../../components/list/InputList"
import CustomButton from "../../components/login-register/CustomButton"
import SpinerFullScreen from "../../components/loading/SpinerFullScreen"

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { userLoginStore } = useAppStore()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const inputList = ['email', 'password']

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await userLoginStore(data)
      navigate('/')
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white h-1/2 flex flex-col justify-center gap-10 rounded-xl w-96 shadow-lg p-6"
    >
      <InputList
        inputs={inputList}
        register={register}
        watch={watch}
        errors={errors}
      />

      <div className="flex flex-col items-center gap-2">
        <Link
          className="text-blue-400 underline underline-offset-auto"
          to={'/auth/forgot-password'}
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <div>
          <span>¿Aun no tienes cuenta?</span>
          <Link
            className="ml-1 text-blue-400 underline underline-offset-auto"
            to={'/auth/register'}
          >
            Registrate
          </Link>
        </div>

        <CustomButton text={loading ? 'Iniciando sesión' : 'Iniciar sesión'} />
      </div>

      <SpinerFullScreen loading={loading} />
    </form>
  )
}
