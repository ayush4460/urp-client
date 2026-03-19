import { Navigate, Outlet } from 'react-router-dom'
import { usePermissionCheck } from '@/hooks/usePermissionCheck'

export const PermissionGuard = ({ permission, redirectTo = '/' }: { permission: string; redirectTo?: string }) => {
  const has = usePermissionCheck(permission)
  return has ? <Outlet /> : <Navigate to={redirectTo} replace />
}
