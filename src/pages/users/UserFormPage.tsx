import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser, useCreateUser, useUpdateUser } from '@/hooks/useUsers'
import { ROUTES } from '@/constants/routes'
import { registerSchema, updateUserSchema, type RegisterForm, type UpdateUserForm } from '@/utils/validators'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/layout/PageHeader'

export default function UserFormPage({ mode }: { mode: 'create' | 'edit' }) {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: existing, isLoading } = useUser(mode === 'edit' ? Number(id) : 0)
  const create = useCreateUser()
  const update = useUpdateUser(Number(id))

  const schema = mode === 'create' ? registerSchema : updateUserSchema
  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(schema),
    values: mode === 'edit' && existing
      ? { firstName: existing.firstName, lastName: existing.lastName, username: existing.username }
      : undefined,
  })

  if (mode === 'edit' && isLoading) return <div className="flex h-64 items-center justify-center"><Spinner size="lg" /></div>

  const onSubmit = (data: any) => {
    if (mode === 'create') create.mutate(data, { onSuccess: () => navigate(ROUTES.USERS) })
    else update.mutate(data, { onSuccess: () => navigate(ROUTES.USER_DETAIL(Number(id))) })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader title={mode === 'create' ? 'Add User' : 'Edit User'}
        breadcrumb={[{ label: 'Users', to: ROUTES.USERS }, { label: mode === 'create' ? 'New' : existing?.fullName ?? 'Edit' }]} />
      <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input {...register('firstName')} label="First Name" error={errors.firstName?.message} required />
            <Input {...register('lastName')} label="Last Name" error={errors.lastName?.message} required />
          </div>
          <Input {...register('username')} label="Username" error={errors.username?.message} required={mode === 'create'} />
          {mode === 'create' && <>
            <Input {...register('email')} label="Email" type="email" error={errors.email?.message} required />
            <Input {...register('password')} label="Password" type="password" error={errors.password?.message} required />
            <Input {...register('confirmPassword')} label="Confirm Password" type="password" error={errors.confirmPassword?.message} required />
          </>}
          {mode === 'edit' && (
            <div className="border-t border-slate-100 pt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">Change Password (optional)</p>
              <div className="flex flex-col gap-4">
                <Input {...register('currentPassword')} label="Current Password" type="password" error={errors.currentPassword?.message} />
                <Input {...register('newPassword')} label="New Password" type="password" error={errors.newPassword?.message} />
                <Input {...register('confirmNewPassword')} label="Confirm New Password" type="password" error={errors.confirmNewPassword?.message} />
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" isLoading={create.isPending || update.isPending}>
              {mode === 'create' ? 'Create User' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
