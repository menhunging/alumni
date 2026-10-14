import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../entities/auth/model/authStore'

export function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => Boolean(state.session))

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}
