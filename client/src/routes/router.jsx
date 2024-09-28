import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import Login from "../views/public/Login";
import Register from '../views/public/Register'
import ForgotPassword from '../views/public/ForgotPassword'
import Invoices from "../views/private/Invoices";
import User from "../views/private/User";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route element={<AuthLayout />}>
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/forgot-password' element={<ForgotPassword />} />
          </Route>
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<AppLayout />}>
            <Route path='/invoices' element={<Invoices />} />
            <Route path='/user' element={<User />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}