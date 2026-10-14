import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../entities/auth/model/authStore'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => Boolean(state.session))
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  return <Outlet />
}
