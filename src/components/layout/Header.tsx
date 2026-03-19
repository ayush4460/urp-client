import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const TITLES: Record<string, string> = {
  '/': 'Dashboard', '/users': 'Users', '/roles': 'Roles',
  '/permissions': 'Permissions', '/profile': 'Profile',
}

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const location = useLocation()
  const title = Object.entries(TITLES).find(([path]) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  )?.[1] ?? 'URP System'

  return (
    <header className="flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 md:px-6">
      <button onClick={onMenuClick} className="rounded-lg p-1.5 hover:bg-slate-100 transition-colors md:hidden">
        <Menu className="h-5 w-5 text-slate-600" />
      </button>
      <h1 className="text-base font-semibold text-slate-900">{title}</h1>
    </header>
  )
}
