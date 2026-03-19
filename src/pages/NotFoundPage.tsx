import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-7xl font-black text-slate-200">404</p>
      <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
      <p className="text-slate-500">The page you're looking for doesn't exist.</p>
      <Link to="/"><Button className="mt-2">Go Home</Button></Link>
    </div>
  )
}
