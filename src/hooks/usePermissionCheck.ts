import { useAuthStore } from '@/store/authStore'

export const usePermissionCheck = (permission: string): boolean => {
  const user = useAuthStore(s => s.user)
  return user?.permissions?.includes(permission) ?? false
}

export const usePermissionsCheck = (permissions: string[]): Record<string, boolean> => {
  const user = useAuthStore(s => s.user)
  return permissions.reduce((acc, p) => {
    acc[p] = user?.permissions?.includes(p) ?? false
    return acc
  }, {} as Record<string, boolean>)
}
