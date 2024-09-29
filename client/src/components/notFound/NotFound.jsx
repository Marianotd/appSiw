import React from 'react'
import { MdOutlineErrorOutline } from "react-icons/md";
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='bg-black/5 w-full h-full px-[10%] flex flex-col justify-center items-center text-center gap-4 text-xl font-bold'>
      <MdOutlineErrorOutline size={'100px'} />
      <h2>Ha ocurrido un error. Vuelva a intentarlo nuevamente o contáctese con el administrador</h2>
      <Link
        className="border border-[#A6A6A6] rounded-xl py-2 px-8 text-center bg-[#A6A6A6] hover:bg-[#444] text-white hover:shadow-lg font-bold tracking-wide ease-out duration-300"
        to={'/'}
      >
        Ir al inicio
      </Link>
    </div>
  )
}
