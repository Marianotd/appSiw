import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavLink({ label, path }) {
  const { pathname } = useLocation()

  const handleLink = () => {
    let result = false

    if (pathname === "/" && path === "/") {
      result = true
    } else if (pathname.includes(path) && path !== "/") {
      result = true
    } else {
      result = false
    }

    return result
  }

  return (
    <Link
      to={path}
      className={`rounded-xl text-center text-white w-full text-lg py-2
        ${handleLink() ? 'font-semibold bg-white/15' : 'font-normal'}
        `}
    >
      {label}
    </Link>
  )
}