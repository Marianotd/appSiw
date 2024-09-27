import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="w-full h-screen text-[#444] flex items-center justify-center bg-[url('/login-register/loginBg.jpg')] bg-no-repeat bg-center bg-cover">
      <Outlet />
    </div>
  )
}
