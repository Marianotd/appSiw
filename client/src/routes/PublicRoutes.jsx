import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppStore } from '../context/useAppStore'

export default function PublicRoutes() {
  const navigate = useNavigate()
  const { isSessionActive } = useAppStore()

  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const session = await isSessionActive()
        if (session) {
          navigate('/invoices')
        }
      } catch (error) {
        navigate('/auth/login')
      }
    }

    fetchSessionStatus()

  }, [location])

  return (
    <Outlet />
  )
}
