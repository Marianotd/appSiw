import React from 'react'

export default function SearchTool({ searchValue, handleInput }) {
  return (
    <div className='text-lg flex items-center gap-2 lg:self-end lg:w-1/3'>
      <input
        type="search"
        onChange={handleInput}
        placeholder='Buscar factura...'
        className={`border hover:border-[#444] w-full focus:border-[#444] rounded-xl py-2 px-4 outline-none search-cancel:appearance-none ease-out duration-300
        ${searchValue ? 'border-[#444]' : 'border-[#A6A6A6]'}
        `}
      />
    </div>
  )
}
