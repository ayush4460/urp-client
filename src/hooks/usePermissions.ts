import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { permissionService } from '@/services/permissionService'
import { queryKeys } from '@/constants/queryKeys'
import type { CreatePermissionDto } from '@/types/permission.types'

export const usePermissions = (group?: string, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: queryKeys.permissions.all(),
    queryFn: () => permissionService.getAll(group),
    enabled: options?.enabled ?? true,
  })

export const useCreatePermission = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreatePermissionDto) => permissionService.create(dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.permissions.all() }); toast.success('Permission created') },
    onError: (e: any) => toast.error(e.response?.data?.message ?? 'Failed'),
  })
}
