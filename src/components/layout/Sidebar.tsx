import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, ShieldCheck, Key, User, LogOut, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants/routes'
import { PERMISSIONS } from '@/constants/permissions'
import { Avatar, Button } from '@/components/ui'
import { cn } from '@/utils/cn'

const NAV = [
  { to: ROUTES.DASHBOARD,   icon: LayoutDashboard, label: 'Dashboard',   permission: null },
  { to: ROUTES.USERS,       icon: Users,           label: 'Users',        permission: PERMISSIONS.USERS_READ },
  { to: ROUTES.ROLES,       icon: ShieldCheck,     label: 'Roles',        permission: PERMISSIONS.ROLES_READ },
  { to: ROUTES.PERMISSIONS, icon: Key,             label: 'Permissions',  permission: PERMISSIONS.PERMISSIONS_READ },
  { to: ROUTES.PROFILE,     icon: User,            label: 'Profile',      permission: null },
]

interface SidebarProps { onClose?: () => void }

export const Sidebar = ({ onClose }: SidebarProps) => {
  const { user, logout } = useAuth()
  const permissions = useAuthStore(s => s.user?.permissions ?? [])

  return (
    <div className="flex h-full flex-col bg-slate-900 text-white">
      <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none">URP System</p>
            <p className="mt-0.5 text-[11px] text-slate-400">Access Control</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-slate-700 transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV.filter(item => !item.permission || permissions.includes(item.permission)).map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={onClose}
            className={({ isActive }) => cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            )}>
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-700/50 px-3 py-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar name={user?.fullName ?? 'User'} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.fullName}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
          <button onClick={logout} title="Sign out"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
