import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Pencil, Plus, X } from 'lucide-react'
import { useUser, useAssignRole, useRemoveRole } from '@/hooks/useUsers'
import { useRoles } from '@/hooks/useRoles'
import { usePermissionCheck } from '@/hooks/usePermissionCheck'
import { ROUTES } from '@/constants/routes'
import { PERMISSIONS } from '@/constants/permissions'
import { epochToISTDate, epochToISTDateTime, epochToRelative } from '@/utils/epoch'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/layout/PageHeader'
import { UserStatusBadge } from '@/components/features/users/UserStatusBadge'
import { PermissionBadge } from '@/components/features/permissions/PermissionBadge'

export default function UserDetailPage() {
  const { id }      = useParams<{ id: string }>()
  const navigate    = useNavigate()
  const canUpdate   = usePermissionCheck(PERMISSIONS.USERS_UPDATE)
  const canAssign   = usePermissionCheck(PERMISSIONS.ROLES_ASSIGN)
  const { data: user, isLoading } = useUser(Number(id))
  const { data: allRoles }        = useRoles()
  const assignRole  = useAssignRole()
  const removeRole  = useRemoveRole()
  const [addModal, setAddModal] = useState(false)
  const [selectedRoleId, setSelectedRoleId] = useState(0)

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>
  if (!user)     return <EmptyState title="User not found" />

  const unassigned = allRoles?.filter(r => !user.roles.some(ur => ur.id === r.id)) ?? []

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader title={user.fullName} subtitle={user.email}
        breadcrumb={[{ label: 'Users', to: ROUTES.USERS }, { label: user.fullName }]}>
        {canUpdate && <Button variant="outline" size="sm" leftIcon={<Pencil className="h-4 w-4" />} onClick={() => navigate(ROUTES.USER_EDIT(user.id))}>Edit</Button>}
      </PageHeader>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Account Details</h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {([['Username', `@${user.username}`], ['Email', user.email], ['Status', <UserStatusBadge isActive={user.isActive} />],
               ['Last Login', epochToISTDateTime(user.lastLoginAt)], ['Created (IST)', epochToISTDate(user.createdAt)],
               ['Updated', epochToRelative(user.updatedAt)]] as [string, any][]).map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-slate-500">{label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Roles</h3>
            {canAssign && unassigned.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setAddModal(true)} className="h-7 w-7 p-0"><Plus className="h-4 w-4" /></Button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {user.roles.length === 0 && <p className="text-sm text-slate-400">No roles assigned</p>}
            {user.roles.map(r => (
              <div key={r.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <Badge variant="info">{r.name}</Badge>
                {canAssign && (
                  <button onClick={() => removeRole.mutate({ userId: user.id, roleId: r.id })} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Effective Permissions ({user.permissions.length})</h3>
        {user.permissions.length === 0
          ? <p className="text-sm text-slate-400">No permissions via current roles</p>
          : <div className="flex flex-wrap gap-1.5">{user.permissions.map(p => <PermissionBadge key={p} name={p} />)}</div>}
      </div>

      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Assign Role" size="sm">
        <div className="flex flex-col gap-4">
          <Select label="Select Role"
            options={[{ value: 0, label: 'Choose a role…' }, ...unassigned.map(r => ({ value: r.id, label: r.name }))]}
            value={selectedRoleId} onChange={e => setSelectedRoleId(Number(e.target.value))} />
          <Button isLoading={assignRole.isPending} disabled={!selectedRoleId}
            onClick={() => assignRole.mutate({ userId: user.id, roleId: selectedRoleId }, { onSuccess: () => setAddModal(false) })}>
            Assign Role
          </Button>
        </div>
      </Modal>
    </div>
  )
}
