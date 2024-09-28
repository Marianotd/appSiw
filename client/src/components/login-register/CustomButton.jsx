import React from 'react'

export default function CustomButton({ text }) {
  return (
    <button
      className="mt-4 border border-[#A6A6A6] rounded-xl py-2 w-1/2 text-center bg-[#A6A6A6] hover:bg-[#444] text-white hover:shadow-lg font-bold tracking-wide ease-out duration-300"
      type="submit"
    >
      {text}
    </button>
  )
}
