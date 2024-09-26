import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {

  return true ? <Outlet /> : <Navigate to="/" />;
};