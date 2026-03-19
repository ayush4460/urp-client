import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { usePermissions, useCreatePermission } from '@/hooks/usePermissions'
import { usePermissionCheck } from '@/hooks/usePermissionCheck'
import { PERMISSIONS } from '@/constants/permissions'
import { epochToISTDate } from '@/utils/epoch'
import { createPermissionSchema, type CreatePermissionForm } from '@/utils/validators'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Table } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { PageHeader } from '@/components/layout/PageHeader'
import { PermissionBadge } from '@/components/features/permissions/PermissionBadge'
import type { PermissionResponse } from '@/types/permission.types'

export default function PermissionsPage() {
  const canCreate = usePermissionCheck(PERMISSIONS.PERMISSIONS_CREATE)
  const { data: permissions, isLoading } = usePermissions()
  const [modal, setModal] = useState(false)
  const create = useCreatePermission()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePermissionForm>({
    resolver: zodResolver(createPermissionSchema),
  })

  const groupColors: Record<string, any> = { Users: 'info', Roles: 'purple', Permissions: 'orange' }

  const columns = [
    { key: 'name', header: 'Permission', cell: (p: PermissionResponse) => <PermissionBadge name={p.name} group={p.group} /> },
    { key: 'group', header: 'Group', cell: (p: PermissionResponse) => <Badge variant={groupColors[p.group] ?? 'default'}>{p.group}</Badge> },
    { key: 'desc', header: 'Description', cell: (p: PermissionResponse) => <span className="text-slate-500">{p.description ?? '—'}</span> },
    { key: 'created', header: 'Created (IST)', cell: (p: PermissionResponse) => <span className="text-xs text-slate-500">{epochToISTDate(p.createdAt)}</span> },
  ]

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <PageHeader title="Permissions" subtitle={`${permissions?.length ?? 0} total`}>
        {canCreate && <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setModal(true)}>New Permission</Button>}
      </PageHeader>
      <Table columns={columns} data={permissions ?? []} isLoading={isLoading} keyExtractor={p => p.id} emptyMessage="No permissions found" />
      <Modal isOpen={modal} onClose={() => { setModal(false); reset() }} title="Create Permission" size="sm">
        <form onSubmit={handleSubmit(d => create.mutate(d, { onSuccess: () => { setModal(false); reset() } }))} className="flex flex-col gap-4">
          <Input {...register('name')} label="Permission Name" error={errors.name?.message} required placeholder="e.g. reports:export" />
          <Input {...register('group')} label="Group" error={errors.group?.message} required placeholder="e.g. Reports" />
          <Input {...register('description')} label="Description (optional)" />
          <Button type="submit" isLoading={create.isPending}>Create Permission</Button>
        </form>
      </Modal>
    </div>
  )
}
