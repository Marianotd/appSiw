import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link
      to='/'
      aria-label='Ir al inicio'
    >
      <img
        src="/logo/Logo.png"
        alt="Logo"
        className="w-16 bg-white rounded-full h-auto object-contain"
      />
    </Link>
  )
}
