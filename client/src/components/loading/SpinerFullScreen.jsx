import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function SpinerFullScreen({ loading }) {
  return (
    <div className={`absolute left-0 w-screen h-screen flex items-center justify-center  ease-out duration-300
      ${loading ? 'bg-black/25 opacity-100 pointer-events-auto' : 'bg-black/0 opacity-0 pointer-events-none'}
      `}>
      <PuffLoader color='#2767D6' />
    </div>
  )
}
