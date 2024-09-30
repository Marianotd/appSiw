import React from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import dayjs from 'dayjs'

export default function TableBody({ invoices, editFunction, deleteFuntion }) {
  const handleFormatDate = (date) => {
    const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm')
    return formattedDate
  }

  return (
    <tbody>
      {
        invoices.map(invoice => (
          <tr key={invoice.number} className='border-t-2 border-b-2 border-white'>
            <td className='p-4 whitespace-nowrap'>{invoice.number}</td>
            <td className='p-4 whitespace-nowrap'>{invoice.client}</td>
            <td className='p-4 whitespace-nowrap'>{handleFormatDate(invoice.date)}</td>
            <td className='p-4 whitespace-nowrap'>$ {invoice.total}</td>
            <td className='p-4 whitespace-nowrap'>
              <span className='flex justify-center gap-6 items-center text-xl'>
                <button
                  onClick={() => editFunction(invoice)}
                  className='hover:text-green-500 ease-out duration-300'
                >
                  <FiEdit />
                </button>

                <button
                  onClick={() => deleteFuntion(invoice)}
                  className='hover:text-red-500 ease-out duration-300'
                >
                  <MdDelete />
                </button>
              </span>
            </td>
          </tr>
        ))
      }
    </tbody>
  )
}
