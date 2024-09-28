import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import NavIcons from './NavIcon'
import Drawer from './Drawer'
import LinkList from '../list/LinkList'
import { useAppStore } from '../../context/useAppStore'

export default function NavBar() {
  const drawerRef = useRef(null)
  const { pathname } = useLocation()
  const { logoutStore } = useAppStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/invoices', label: 'Facturas' },
    { path: '/clients', label: 'Clientes' },
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

  const handleLogout = async () => {
    const isClosed = await logoutStore()
    if (isClosed) {
      navigate('/auth/login')
    } else {
      alert('Algo salió mal')
    }
  }

  return (
    <nav className='container py-2 px-4 mx-auto flex justify-between items-center'>
      <Logo />

      <div className='hidden lg:flex w-full justify-evenly items-center'>
        <LinkList
          data={navLinks}
          isDrawer={false}
        />

        <button
          className='rounded-xl text-center w-1/6 text-white hover:font-bold text-lg py-2 ease-out duration-150'
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>

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
