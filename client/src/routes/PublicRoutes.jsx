import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../context/useAppStore'

export default function PublicRoutes() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isSessionActive } = useAppStore()

  useEffect(() => {
    const fetchSessionStatus = async () => {
      if (!pathname.includes('auth')) {
        try {
          const session = await isSessionActive()
          if (session) {
            navigate('/invoices')
          }
        } catch (error) {
          console.error(error)
          navigate('/auth/login')
        }
      }
    }

    fetchSessionStatus()

  }, [pathname])

  return (
    <Outlet />
  )
}
