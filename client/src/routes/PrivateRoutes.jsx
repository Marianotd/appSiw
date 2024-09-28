import { useEffect } from "react"
import { useAppStore } from "../context/useAppStore"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export default function PrivateRoutes() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSessionActive } = useAppStore()

  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const session = await isSessionActive()
        if (!session) {
          navigate('/auth/login')
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
