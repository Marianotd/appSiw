import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../context/useAppStore'

export default function PublicRoutes() {
  const navigate = useNavigate()
  const location = useLocation()
  const { status } = useAppStore()

  useEffect(() => {
    if (status) {
      navigate('/')
    }
  }, [location])
  return (
    <Outlet />
  )
}
