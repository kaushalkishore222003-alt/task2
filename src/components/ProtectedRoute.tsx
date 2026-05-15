import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../context/useAuthStore';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
