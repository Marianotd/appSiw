import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";

export default function NavIcon({ setOpen, open }) {
  return (
    <div className="flex items-center justify-evenly gap-4">
      <button
        className={`lg:hidden text-4xl text-white`}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="drawer"
      >
        <AiOutlineMenu />
      </button>
    </div>
  )
}