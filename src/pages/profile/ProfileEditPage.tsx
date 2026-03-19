import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/authStore";
import { useUpdateUser } from "@/hooks/useUsers";
import { authService } from "@/services/authService";
import { updateUserSchema, type UpdateUserForm } from "@/utils/validators";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/layout/PageHeader";
import { ROUTES } from "@/constants/routes";

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const update = useUpdateUser(user?.id ?? 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      username: user?.username ?? "",
    },
  });

  const onSubmit = (data: UpdateUserForm) => {
    const payload: UpdateUserForm = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
    };

    if (data.newPassword && data.newPassword.length > 0) {
      payload.currentPassword = data.currentPassword;
      payload.newPassword = data.newPassword;
      payload.confirmNewPassword = data.confirmNewPassword;
    }

    update.mutate(payload, {
      onSuccess: async () => {
        try {
          const fresh = await authService.getMe();
          setUser(fresh);
        } catch {
          /* ignore */
        }
        navigate(ROUTES.PROFILE);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageHeader
        title="Edit Profile"
        breadcrumb={[
          { label: "Profile", to: ROUTES.PROFILE },
          { label: "Edit" },
        ]}
      />

      <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              {...register("firstName")}
              label="First Name"
              error={errors.firstName?.message}
              required
            />
            <Input
              {...register("lastName")}
              label="Last Name"
              error={errors.lastName?.message}
              required
            />
          </div>

          <Input
            {...register("username")}
            label="Username"
            error={errors.username?.message}
          />

          <div className="border-t border-slate-100 pt-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
              Change Password (optional)
            </p>
            <div className="flex flex-col gap-4">
              <Input
                {...register("currentPassword")}
                label="Current Password"
                type="password"
                error={errors.currentPassword?.message}
              />
              <Input
                {...register("newPassword")}
                label="New Password"
                type="password"
                error={errors.newPassword?.message}
              />
              <Input
                {...register("confirmNewPassword")}
                label="Confirm New Password"
                type="password"
                error={errors.confirmNewPassword?.message}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(ROUTES.PROFILE)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={update.isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
