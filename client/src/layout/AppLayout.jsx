import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/auth/login')
  }, [])

  return (
    <div>
      <header>
        This is the header
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        This is the footer
      </footer>
    </div>
  )
}
