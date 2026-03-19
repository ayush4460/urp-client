import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Eye } from 'lucide-react'
import { useRoles, useCreateRole } from '@/hooks/useRoles'
import { usePermissionCheck } from '@/hooks/usePermissionCheck'
import { ROUTES } from '@/constants/routes'
import { PERMISSIONS } from '@/constants/permissions'
import { epochToISTDate } from '@/utils/epoch'
import { createRoleSchema, type CreateRoleForm } from '@/utils/validators'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { PageHeader } from '@/components/layout/PageHeader'
import type { RoleResponse } from '@/types/role.types'

export default function RolesPage() {
  const navigate  = useNavigate()
  const canCreate = usePermissionCheck(PERMISSIONS.ROLES_CREATE)
  const { data: roles, isLoading } = useRoles()
  const [modal, setModal] = useState(false)
  const create = useCreateRole()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateRoleForm>({ resolver: zodResolver(createRoleSchema) })

  const columns = [
    { key: 'name', header: 'Role', cell: (r: RoleResponse) => <span className="font-semibold text-slate-900">{r.name}</span> },
    { key: 'desc', header: 'Description', cell: (r: RoleResponse) => <span className="text-slate-500">{r.description ?? '—'}</span> },
    { key: 'perms', header: 'Permissions', cell: (r: RoleResponse) => <Badge variant="purple">{r.permissions.length}</Badge> },
    { key: 'created', header: 'Created (IST)', cell: (r: RoleResponse) => <span className="text-xs text-slate-500">{epochToISTDate(r.createdAt)}</span> },
    { key: 'actions', header: '', cell: (r: RoleResponse) => (
      <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.ROLE_DETAIL(r.id))} className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
    )},
  ]

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <PageHeader title="Roles" subtitle={`${roles?.length ?? 0} total`}>
        {canCreate && <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setModal(true)}>New Role</Button>}
      </PageHeader>
      <Table columns={columns} data={roles ?? []} isLoading={isLoading} keyExtractor={r => r.id} emptyMessage="No roles found" />
      <Modal isOpen={modal} onClose={() => { setModal(false); reset() }} title="Create Role" size="sm">
        <form onSubmit={handleSubmit(d => create.mutate(d, { onSuccess: () => { setModal(false); reset() } }))} className="flex flex-col gap-4">
          <Input {...register('name')} label="Role Name" error={errors.name?.message} required placeholder="e.g. Editor" />
          <Input {...register('description')} label="Description (optional)" placeholder="What this role can do" />
          <Button type="submit" isLoading={create.isPending}>Create Role</Button>
        </form>
      </Modal>
    </div>
  )
}
