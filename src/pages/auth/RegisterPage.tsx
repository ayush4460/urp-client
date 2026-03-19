import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldCheck } from 'lucide-react'
import { useCreateUser } from '@/hooks/useUsers'
import { registerSchema, type RegisterForm } from '@/utils/validators'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function RegisterPage() {
  const navigate = useNavigate()
  const create = useCreateUser()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit(d => create.mutate(d as any, { onSuccess: () => navigate('/login') }))} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input {...register('firstName')} label="First Name" error={errors.firstName?.message} required />
              <Input {...register('lastName')} label="Last Name" error={errors.lastName?.message} required />
            </div>
            <Input {...register('username')} label="Username" error={errors.username?.message} required />
            <Input {...register('email')} label="Email" type="email" error={errors.email?.message} required />
            <Input {...register('password')} label="Password" type="password" error={errors.password?.message} required />
            <Input {...register('confirmPassword')} label="Confirm Password" type="password" error={errors.confirmPassword?.message} required />
            <Button type="submit" isLoading={create.isPending} className="mt-1 w-full">Create Account</Button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
