import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import InputList from "../../components/list/InputList"
import CustomButton from "../../components/login-register/CustomButton"
import SpinerFullScreen from "../../components/loading/SpinerFullScreen"
import { forgotPassword } from "../../service"

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ isError: false, message: '' })
  const [message, setMessage] = useState(null)
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
  const inputList = ['email']

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await forgotPassword(data)
      if (!response.data.isError) {
        setMessage(response.data.message)
      }
    } catch (error) {
      setError(error.response.data)
      console.error('Error en el envío del formulario:', error);
    } finally {
      setLoading(false)
      setTimeout(() => {
        setError({ isError: false, message: '' })
        setMessage(null)
      }, 3000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white min-h-1/2 flex flex-col justify-center gap-6 rounded-xl w-96 shadow-lg p-6"
    >
      <p className="font-bold text-center px-4 text-lg">
        Ingresa tu correo electrónico para que podamos enviarte el link para restablecer tu contraseña.
      </p>

      <InputList
        inputs={inputList}
        register={register}
        watch={watch}
        errors={errors}
      />

      <div className="flex flex-col items-center gap-2">
        <div>
          <span>¿Aun no tienes cuenta?</span>
          <Link
            className="ml-1 text-blue-400 underline underline-offset-auto"
            to={'/auth/register'}
          >
            Registrate
          </Link>
        </div>

        {message && (<span className="text-green-500 text-center">{message}</span>)}
        {error.isError && (<span className="text-red-500 text-center">{error.message}</span>)}

        <CustomButton text={loading ? 'Enviando' : 'Enviar'} />

        <div>
          <span>Volver a</span>
          <Link
            className="ml-1 text-blue-400 underline underline-offset-auto"
            to={'/auth/login'}
          >
            inicio de sesión
          </Link>
        </div>

      </div>

      <SpinerFullScreen loading={loading} />
    </form>
  )
}
