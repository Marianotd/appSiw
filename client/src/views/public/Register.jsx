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
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const inputList = ['first_name', 'last_name', 'email', 'password', 'confirm_password']

  const onSubmit = async (data) => {
    console.log(data)
    try {
      setLoading(true)
      await registerUser(data)
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

        <CustomButton text={'Registrarse'} />
      </div>

      <SpinerFullScreen loading={loading} />
    </form>
  )
}
