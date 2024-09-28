import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function CustomLoader({ loading }) {
  return (
    <div className={`w-full h-full flex items-center justify-center ease-out duration-300
      ${loading ? 'bg-black/5 opacity-100 pointer-events-auto' : 'bg-black/0 opacity-0 pointer-events-none'}
      `}>
      <PuffLoader color='#2767D6' />
    </div>
  )
}
