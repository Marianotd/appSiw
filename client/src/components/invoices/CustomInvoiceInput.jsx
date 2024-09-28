import { useState, useEffect } from 'react';
import { PiEye, PiEyeClosed } from "react-icons/pi";

export default function CustomInvoiceInput({ name, register, watch, error }) {
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

  const typeSelector = name === 'number' || name === 'total' ? 'number' : name === 'date' ? 'datetime-local' : 'text';
  const placeholderSelector = name === 'number' ? 'Número de factura' : name === 'client' ? 'Cliente' : name === 'date' ? 'Fecha de factura' : name === 'total' ? 'Total' : 'No identificado';
  const labelSelector = placeholderSelector[0].toUpperCase() + placeholderSelector.substring(1);

  const validationRules = {
    number: {
      required: 'Campo obligatorio',
      pattern: { value: /^[0-9]+$/, message: 'Debe incluir solo números' }
    },
    client: {
      required: 'Campo obligatorio',
      pattern: { value: /^[a-zA-Z\s]+$/, message: 'Debe incluir solo letras y espacios' }
    },
    date: {
      required: 'Campo obligatorio',
      pattern: { value: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, message: 'Formato de fecha y hora: YYYY-MM-DD HH:MM' }
    },
    total: {
      required: 'Campo obligatorio',
      pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/, message: 'Debe ser un número válido con hasta 2 decimales' }
    },
  };

  return (
    <div className="relative w-full">
      <div
        className={`relative text-lg border hover:border-[#444] focus:border-[#444] py-2 px-2 rounded-xl ease-out duration-300
        ${error ? 'border-red-500' : inputValue ? 'border-[#444]' : 'border-[#A6A6A6]'}`}
        onClick={handleClick}
      >
        <input
          type={typeSelector}
          step={name === 'total' ? "0.01" : undefined}
          className={`border-none outline-none peer bg-transparent rounded-xl px-4 w-full
          ${error ? 'border-red-600' : inputValue ? 'border-textMain' : 'border-textMain/50'}
          `}
          {...register(name, validationRules[name])}
        />

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
          </div>
        )}
    </div>
  );
}
