import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginForm } from '@/utils/validators'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">URP System</h1>
            <p className="mt-1 text-sm text-slate-500">Sign in to your account</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit(d => login(d))} className="flex flex-col gap-4">
            <Input {...register('email')} label="Email address" type="email"
              placeholder="superadmin@urp.local" error={errors.email?.message} required autoComplete="email" />
            <Input {...register('password')} label="Password" type="password"
              placeholder="••••••••" error={errors.password?.message} required autoComplete="current-password" />
            <Button type="submit" isLoading={isLoggingIn} className="mt-1 w-full">Sign in</Button>
          </form>
        </div>

        <p className="mt-3 text-center text-xs text-slate-400">
          Default: <code className="bg-slate-100 px-1.5 py-0.5 rounded">superadmin@urp.local</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded">Admin@123</code>
        </p>
        <p className="mt-3 text-center text-sm text-slate-500">
          No account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}
