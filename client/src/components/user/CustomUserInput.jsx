import React, { useEffect, useState } from 'react'
import { PiEye, PiEyeClosed } from "react-icons/pi";

export default function CustomUserInput({ name, register, watch, error }) {
  const [showError, setShowError] = useState(error);
  const [showPass, setShowPass] = useState(false)
  const inputValue = watch(name);

  useEffect(() => {
    if (error) {
      setShowError(true)
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleClick = () => {
    setShowError(false);
  };

  const typeSelector = name === 'email' ? 'email' : name === 'password' || name === 'new_password' ? 'password' : 'text';
  const placeholderSelector = name === 'first_name' ? 'Nombre' : name === 'last_name' ? 'Apellido' : name === 'email' ? 'Correo electrónico' : name === 'password' ? 'Contraseña' : name === 'new_password' ? 'Nueva contraseña' : 'No identificado';
  const labelSelector = placeholderSelector[0].toUpperCase() + placeholderSelector.substring(1);

  const validationRules = {
    email: {
      required: 'Campo obligatorio',
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo electrónico inválido' }
    },
    password: {
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, message: 'La contraseña debe contener:'
      }
    },
    new_password: {
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, message: 'La contraseña debe contener:'
      }
    },
    first_name: { required: 'Campo obligatorio', pattern: { value: /[aA-zZ]/, message: 'El nombre solo puede incluir letras' } },
    last_name: { required: 'Campo obligatorio', pattern: { value: /[aA-zZ]/, message: 'El apellido solo puede incluir letras' } },
  };

  return (
    <div className="relative w-full">
      <div
        className={`relative text-lg border hover:border-[#444] focus:border-[#444] py-2 px-2 rounded-xl ease-out duration-300
        ${error ? 'border-red-500' : inputValue ? 'border-[#444]' : 'border-[#A6A6A6]'}`}
        onClick={handleClick}
      >

        <input
          type={typeSelector === 'password' ? showPass ? 'text' : 'password' : typeSelector}
          className={`border-none outline-none peer bg-transparent rounded-xl px-4
          ${error ? 'border-red-600' : inputValue ? 'border-textMain' : 'border-textMain/50'}
          ${typeSelector === 'password' ? 'w-11/12' : 'w-full'}
          `}
          {...register(name, validationRules[name])}
        />

        {
          typeSelector === 'password' && (
            <button
              type='button'
              className='absolute bg-white right-4 top-[30%] text-xl'
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <PiEye /> : <PiEyeClosed />}
            </button>
          )
        }

        <label
          className={`absolute peer-focus:-top-[35%] pointer-events-none peer-focus:text-[#444] left-4 bg-white px-2 transition-all rounded-xl ease-out duration-300
          ${error ? 'text-red-500' : inputValue ? '-top-[35%]' : 'top-[17.5%] text-[#A6A6A6]'}`}
          htmlFor={name}
        >
          {labelSelector}
        </label>
      </div>

      {
        showError && error && (
          <div
            onClick={handleClick}
            className="absolute z-10 bg-white text-sm top-full left-2 p-4 shadow-xl rounded-xl text-red-500"
          >
            <p>{error.message}</p>
            {
              name === 'password' || name === 'new_password' && (
                <>
                  <li>Al menos 8 caracteres</li>
                  <li>Al menos una letra mayúscula</li>
                  <li>Al menos una letra minúscula</li>
                  <li>Al menos un número</li>
                  <li>Al menos un carácter especial</li>
                </>
              )
            }
          </div>
        )}
    </div>
  )
}
