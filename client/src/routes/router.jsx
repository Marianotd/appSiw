import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path='/auth/register' element={<div className="bg-red-500 h-screen">Hola, soy el div</div>} />
            <Route path='/auth/login' element={<></>} />
            <Route path='/auth/forgot-password' element={<></>} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path='/' element={<></>} />
            <Route path='/invoices' element={<></>} />
            <Route path='/invoices/:id' element={<></>} />
            <Route path='/clients' element={<></>} />
            <Route path='/client/:id' element={<></>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}