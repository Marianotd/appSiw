import React from 'react'
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";

export default function TableHead({ fields, handleSort, renderSortIcon }) {
  return (
    <thead>
      <tr className='border-b-4 border-white bg-[#3B82F6] text-white'>
        {
          fields.map(({ invField, description }) => (
            <th
              key={invField}
              className='px-4 py-5 text-left cursor-pointer'
              onClick={() => handleSort(invField)}
            >
              <span className='flex items-center gap-2'>
                {renderSortIcon(invField) ? <FaCaretDown /> : <FaCaretRight />}
                {description}
              </span>
            </th>
          ))
        }

        <th className='px-4 py-4 text-left cursor-pointer'>
          Acciones
        </th>
      </tr>
    </thead>
  )
}
