import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import { useRole, useAssignPermission, useRemovePermission } from '@/hooks/useRoles'
import { usePermissions } from '@/hooks/usePermissions'
import { usePermissionCheck } from '@/hooks/usePermissionCheck'
import { ROUTES } from '@/constants/routes'
import { PERMISSIONS } from '@/constants/permissions'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/layout/PageHeader'
import { PermissionBadge } from '@/components/features/permissions/PermissionBadge'
import type { PermissionResponse } from '@/types/permission.types'

export default function RoleDetailPage() {
  const { id }      = useParams<{ id: string }>()
  const canAssign   = usePermissionCheck(PERMISSIONS.PERMISSIONS_ASSIGN)
  const { data: role, isLoading } = useRole(Number(id))
  const { data: allPerms }        = usePermissions()
  const assign  = useAssignPermission()
  const remove  = useRemovePermission()
  const [modal, setModal] = useState(false)
  const [selectedPerm, setSelectedPerm] = useState(0)

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>
  if (!role) return <EmptyState title="Role not found" />

  const unassigned = allPerms?.filter(p => !role.permissions.some(rp => rp.id === p.id)) ?? []
  const grouped    = role.permissions.reduce((acc, p) => {
    (acc[p.group] ??= []).push(p); return acc
  }, {} as Record<string, PermissionResponse[]>)

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader title={role.name} subtitle={role.description ?? undefined}
        breadcrumb={[{ label: 'Roles', to: ROUTES.ROLES }, { label: role.name }]}>
        {canAssign && unassigned.length > 0 && (
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setModal(true)}>Add Permission</Button>
        )}
      </PageHeader>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Assigned Permissions ({role.permissions.length})
        </h3>
        {role.permissions.length === 0
          ? <EmptyState title="No permissions" description="Click 'Add Permission' to assign one." />
          : Object.entries(grouped).map(([group, perms]) => (
            <div key={group} className="mb-4">
              <p className="mb-2 text-xs font-semibold text-slate-400">{group}</p>
              <div className="flex flex-wrap gap-2">
                {perms.map(p => (
                  <div key={p.id} className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
                    <PermissionBadge name={p.name} group={p.group} />
                    {canAssign && (
                      <button onClick={() => remove.mutate({ roleId: role.id, permissionId: p.id })} className="text-slate-300 hover:text-red-500 transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)} title="Assign Permission" size="sm">
        <div className="flex flex-col gap-4">
          <Select label="Select Permission"
            options={[{ value: 0, label: 'Choose a permission…' }, ...unassigned.map(p => ({ value: p.id, label: `${p.name} (${p.group})` }))]}
            value={selectedPerm} onChange={e => setSelectedPerm(Number(e.target.value))} />
          <Button isLoading={assign.isPending} disabled={!selectedPerm}
            onClick={() => assign.mutate({ roleId: role.id, permissionId: selectedPerm }, { onSuccess: () => setModal(false) })}>
            Assign Permission
          </Button>
        </div>
      </Modal>
    </div>
  )
}
