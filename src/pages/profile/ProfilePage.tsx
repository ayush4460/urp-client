import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { epochToISTDate, epochToISTDateTime } from "@/utils/epoch";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { PageHeader } from "@/components/layout/PageHeader";
import { UserStatusBadge } from "@/components/features/users/UserStatusBadge";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader title="My Profile" />
      <div className="max-w-2xl">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-4 pb-5 border-b border-slate-100 mb-5">
            <Avatar name={user.fullName} size="lg" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {user.fullName}
              </h2>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(
              [
                ["Username", `@${user.username}`],
                ["Status", <UserStatusBadge isActive={user.isActive} />],
                ["Last Login (IST)", epochToISTDateTime(user.lastLoginAt)],
                ["Member Since", epochToISTDate(user.createdAt)],
              ] as [string, any][]
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-slate-500">{label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-slate-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 pt-5 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Pencil className="h-4 w-4" />}
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
