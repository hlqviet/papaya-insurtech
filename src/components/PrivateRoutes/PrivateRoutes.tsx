import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuth from '../../hooks/useAuth/useAuth'

const PrivateRoutes = () => {
  const location = useLocation()
  const { user } = useAuth()

  if (!user) return <Navigate to='/login' replace state={{ from: location }} />

  return <Outlet />
}

export default PrivateRoutes
