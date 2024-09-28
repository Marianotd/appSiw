import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";

export default function AppLayout() {
  return (
    <>
      <header className="w-full bg-[#3B82F6] relative">
        <NavBar />
      </header>

      <main className="relative container mx-auto h-screen">
        <Outlet />
      </main>
    </>
  )
}
