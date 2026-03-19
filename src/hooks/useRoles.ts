import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { roleService } from '@/services/roleService'
import { permissionService } from '@/services/permissionService'
import { queryKeys } from '@/constants/queryKeys'
import type { CreateRoleDto } from '@/types/role.types'
import type { AssignPermissionDto } from '@/types/permission.types'

export const useRoles = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: queryKeys.roles.all(),
    queryFn: roleService.getAll,
    enabled: options?.enabled ?? true,
  })

export const useRole = (id: number) =>
  useQuery({ queryKey: queryKeys.roles.detail(id), queryFn: () => roleService.getById(id), enabled: !!id })

export const useCreateRole = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateRoleDto) => roleService.create(dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.roles.all() }); toast.success('Role created') },
    onError: (e: any) => toast.error(e.response?.data?.message ?? 'Failed'),
  })
}

export const useAssignPermission = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: AssignPermissionDto) => permissionService.assign(dto),
    onSuccess: (_, { roleId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.roles.detail(roleId) })
      toast.success('Permission assigned')
    },
    onError: (e: any) => toast.error(e.response?.data?.message ?? 'Failed'),
  })
}

export const useRemovePermission = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: AssignPermissionDto) => permissionService.remove(dto),
    onSuccess: (_, { roleId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.roles.detail(roleId) })
      toast.success('Permission removed')
    },
    onError: (e: any) => toast.error(e.response?.data?.message ?? 'Failed'),
  })
}
