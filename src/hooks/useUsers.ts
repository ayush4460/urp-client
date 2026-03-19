import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { userService } from '@/services/userService'
import { roleService } from '@/services/roleService'
import { queryKeys } from '@/constants/queryKeys'
import type { PaginationQuery } from '@/types/api.types'
import type { CreateUserDto, UpdateUserDto } from '@/types/user.types'
import type { AssignRoleDto, RemoveRoleDto } from '@/types/role.types'

export const useUsers = (params: PaginationQuery = {}, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => userService.getAll(params),
    enabled: options?.enabled ?? true,  
  })

export const useUser = (id: number) =>
  useQuery({ queryKey: queryKeys.users.detail(id), queryFn: () => userService.getById(id), enabled: !!id })

export const useCreateUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateUserDto) => userService.create(dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.users.all() }); toast.success('User created') },
    onError: (e: any) => toast.error(e.response?.data?.message ?? 'Failed to create user'),
  })
}

export const useUpdateUser = (id: number) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateUserDto) => userService.update(id, dto),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.users.all() })
      qc.setQueryData(queryKeys.users.detail(id), data)
      toast.success('User updated')
    },
    onError: (e: any) => toast.error(e.response?.data?.message ?? 'Failed to update user'),
  })
}

export const useDeleteUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => userService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.users.all() }); toast.success('User deleted') },
    onError: () => toast.error('Failed to delete user'),
  })
}

export const useAssignRole = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: AssignRoleDto) => roleService.assign(dto),
    onSuccess: (_, { userId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })
      toast.success('Role assigned')
    },
    onError: (e: any) => toast.error(e.response?.data?.message ?? 'Failed to assign role'),
  })
}

export const useRemoveRole = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: RemoveRoleDto) => roleService.remove(dto),
    onSuccess: (_, { userId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })
      toast.success('Role removed')
    },
    onError: (e: any) => toast.error(e.response?.data?.message ?? 'Failed'),
  })
}
