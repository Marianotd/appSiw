import React from 'react'
import { MdOutlineErrorOutline } from "react-icons/md";

export default function NotFound() {
  return (
    <div className='bg-black/5 w-full h-full px-[10%] flex flex-col justify-center items-center text-center gap-4 text-xl font-bold'>
      <MdOutlineErrorOutline size={'100px'} />
      <h2>Ha ocurrido un error. Vuelva a intentarlo nuevamente o contáctese con el administrador</h2>
    </div>
  )
}
