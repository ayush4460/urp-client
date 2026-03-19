import { Badge } from '@/components/ui/Badge'

export const UserStatusBadge = ({ isActive }: { isActive: boolean }) => (
  <Badge variant={isActive ? 'success' : 'danger'}>{isActive ? 'Active' : 'Inactive'}</Badge>
)
