import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import InputList from "../../components/list/InputList"
import CustomButton from "../../components/login-register/CustomButton"
import SpinerFullScreen from "../../components/loading/SpinerFullScreen"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const inputList = ['email']

  const onSubmit = async (data) => {
    try {
      setLoading(true)
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white h-1/2 flex flex-col justify-center gap-6 rounded-xl w-96 shadow-lg p-6"
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
