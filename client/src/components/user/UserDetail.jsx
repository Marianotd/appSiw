import React from 'react'

export default function UserDetail({ user }) {
  const { first_name, last_name, email } = user
  return (
    <div className='flex flex-col items-start justify-evenly gap-4 text-lg border border-[#444] py-8 px-4 rounded-xl bg-[#3B82F6]'>
      <div className='w-full p-4 bg-white rounded-xl flex flex-col lg:flex-row items-center gap-2 border border-[#444]'>
        <h3>Nombre: </h3>
        <span className='font-bold max-w-full lg:max-w-[60%] truncate'>{first_name}</span>
      </div>

      <div className='w-full p-4 bg-white rounded-xl flex flex-col lg:flex-row items-center gap-2 border border-[#444]'>
        <h3>Apellido: </h3>
        <span className='font-bold max-w-full lg:max-w-[60%] truncate'>{last_name}</span>
      </div>

      <div className='w-full p-4 bg-white rounded-xl flex flex-col lg:flex-row items-center gap-2 border border-[#444]'>
        <h3>Correo electrónico: </h3>
        <span className='font-bold max-w-full lg:max-w-[60%] truncate'>{email}</span>
      </div>

    </div>
  )
}
