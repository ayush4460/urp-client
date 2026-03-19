import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import { useUsers, useDeleteUser } from '@/hooks/useUsers'
import { usePermissionCheck } from '@/hooks/usePermissionCheck'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import { ROUTES } from '@/constants/routes'
import { PERMISSIONS } from '@/constants/permissions'
import { epochToISTDate } from '@/utils/epoch'
import { Button } from '@/components/ui/Button'
import { SearchInput } from '@/components/ui/SearchInput'
import { Table } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Pagination } from '@/components/ui/Pagination'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Avatar } from '@/components/ui/Avatar'
import { PageHeader } from '@/components/layout/PageHeader'
import { UserStatusBadge } from '@/components/features/users/UserStatusBadge'
import type { UserResponse } from '@/types/user.types'

export default function UsersPage() {
  const navigate   = useNavigate()
  const canCreate  = usePermissionCheck(PERMISSIONS.USERS_CREATE)
  const canDelete  = usePermissionCheck(PERMISSIONS.USERS_DELETE)
  const { page, params, setPage, setSearch, search } = usePagination()
  const debouncedSearch = useDebounce(search, 400)
  const { data, isLoading } = useUsers({ ...params, search: debouncedSearch })
  const deleteUser = useDeleteUser()
  const [target, setTarget] = useState<UserResponse | null>(null)

  const columns = [
    { key: 'user', header: 'User', cell: (u: UserResponse) => (
      <div className="flex items-center gap-3">
        <Avatar name={u.fullName} size="sm" />
        <div><p className="font-medium text-slate-900">{u.fullName}</p><p className="text-xs text-slate-500">{u.email}</p></div>
      </div>
    )},
    { key: 'username', header: 'Username', cell: (u: UserResponse) => <span className="font-mono text-sm">@{u.username}</span> },
    { key: 'roles', header: 'Roles', cell: (u: UserResponse) => (
      <div className="flex flex-wrap gap-1">{u.roles.map(r => <Badge key={r.id} variant="info">{r.name}</Badge>)}</div>
    )},
    { key: 'status', header: 'Status', cell: (u: UserResponse) => <UserStatusBadge isActive={u.isActive} /> },
    { key: 'created', header: 'Created (IST)', cell: (u: UserResponse) => <span className="text-xs text-slate-500">{epochToISTDate(u.createdAt)}</span> },
    { key: 'actions', header: '', cell: (u: UserResponse) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.USER_DETAIL(u.id))} className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
        <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.USER_EDIT(u.id))} className="h-8 w-8 p-0"><Pencil className="h-4 w-4" /></Button>
        {canDelete && <Button variant="ghost" size="sm" onClick={() => setTarget(u)} className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>}
      </div>
    )},
  ]

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <PageHeader title="Users" subtitle={data ? `${data.totalCount} total` : ''}>
        {canCreate && <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => navigate(ROUTES.USER_NEW)}>Add User</Button>}
      </PageHeader>
      <SearchInput value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search by name, email, username…" />
      <Table columns={columns} data={data?.items ?? []} isLoading={isLoading} keyExtractor={u => u.id} emptyMessage="No users found" />
      {data && <Pagination page={page} totalPages={data.totalPages} totalCount={data.totalCount} onPageChange={setPage} />}
      <ConfirmDialog isOpen={!!target} onClose={() => setTarget(null)}
        onConfirm={() => target && deleteUser.mutate(target.id, { onSuccess: () => setTarget(null) })}
        title="Delete User" message={`Delete ${target?.fullName}? This cannot be undone.`}
        confirmLabel="Delete" isLoading={deleteUser.isPending} />
    </div>
  )
}
