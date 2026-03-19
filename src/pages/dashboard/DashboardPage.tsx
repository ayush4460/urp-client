import { Users, ShieldCheck, Key } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUsers } from "@/hooks/useUsers";
import { useRoles } from "@/hooks/useRoles";
import { usePermissions } from "@/hooks/usePermissions";
import { usePermissionCheck } from "@/hooks/usePermissionCheck";
import { PERMISSIONS } from "@/constants/permissions";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { PermissionBadge } from "@/components/features/permissions/PermissionBadge";

const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value?: number;
  icon: any;
  color: string;
}) => (
  <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
    >
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-900">
        {value !== undefined ? (
          value
        ) : (
          <span className="text-slate-400 text-base">N/A</span>
        )}
      </p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const canReadUsers = usePermissionCheck(PERMISSIONS.USERS_READ);
  const canReadRoles = usePermissionCheck(PERMISSIONS.ROLES_READ);
  const canReadPerms = usePermissionCheck(PERMISSIONS.PERMISSIONS_READ);

  // Only fetch if user has permission — enabled: false skips the API call entirely
  const { data: usersData } = useUsers(
    { pageSize: 1 },
    { enabled: canReadUsers },
  );
  const { data: roles } = useRoles({ enabled: canReadRoles });
  const { data: permissions } = usePermissions(undefined, {
    enabled: canReadPerms,
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Welcome back, {user?.firstName} 👋
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Here's an overview of your URP system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {canReadUsers && (
          <StatCard
            label="Total Users"
            value={usersData?.totalCount}
            icon={Users}
            color="bg-blue-600"
          />
        )}
        {canReadRoles && (
          <StatCard
            label="Roles"
            value={roles?.length}
            icon={ShieldCheck}
            color="bg-purple-600"
          />
        )}
        {canReadPerms && (
          <StatCard
            label="Permissions"
            value={permissions?.length}
            icon={Key}
            color="bg-orange-500"
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Your Roles
          </h3>
          <div className="flex flex-wrap gap-2">
            {!user?.roles.length && (
              <p className="text-sm text-slate-400">No roles assigned</p>
            )}
            {user?.roles.map((r) => (
              <Badge key={r.id} variant="info">
                {r.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Your Permissions
          </h3>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {!user?.permissions.length && (
              <p className="text-sm text-slate-400">No permissions assigned</p>
            )}
            {user?.permissions.map((p) => (
              <PermissionBadge key={p} name={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
