import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from './Logo'
import NavIcons from './NavIcon'
import Drawer from './Drawer'

export default function () {
  const drawerRef = useRef(null)
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/facturas', label: 'Facturas' },
    { path: '/clientes', label: 'Clientes' },
    { path: '/user', label: 'Mis Datos' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflow = open ? 'hidden' : 'auto'
    }

    handleScroll()
  }, [open])

  useEffect(() => {
    if (open) {
      const handleClickOutside = (e) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav className='relative container py-2 px-4 mx-auto flex justify-between items-center'>
      <Logo />

      <NavIcons open={open} setOpen={setOpen} />

      <Drawer
        state={open}
        data={navLinks}
        drawerRef={drawerRef}
        handleState={setOpen}
      />
    </nav>
  )
}
