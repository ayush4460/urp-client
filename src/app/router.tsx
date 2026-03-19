import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, startTransition } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { PermissionGuard } from "@/components/layout/PermissionGuard";
import { Spinner } from "@/components/ui/Spinner";
import { ROUTES } from "@/constants/routes";
import { PERMISSIONS } from "@/constants/permissions";
import ProfileEditPage from "@/pages/profile/ProfileEditPage";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const UsersPage = lazy(() => import("@/pages/users/UsersPage"));
const UserDetailPage = lazy(() => import("@/pages/users/UserDetailPage"));
const UserFormPage = lazy(() => import("@/pages/users/UserFormPage"));
const RolesPage = lazy(() => import("@/pages/roles/RolesPage"));
const RoleDetailPage = lazy(() => import("@/pages/roles/RoleDetailPage"));
const PermissionsPage = lazy(
  () => import("@/pages/permissions/PermissionsPage"),
);
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Full page loading fallback
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <Spinner size="lg" />
  </div>
);

// Route-level fallback
const RouteLoader = () => (
  <div className="flex h-64 items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<PageLoader />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<RouteLoader />}>
                <DashboardPage />
              </Suspense>
            ),
          },

          {
            path: "profile",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: "profile/edit",
            element: (
              <Suspense fallback={<RouteLoader />}>
                <ProfileEditPage />
              </Suspense>
            ),
          },

          {
            path: "users",
            element: <PermissionGuard permission={PERMISSIONS.USERS_READ} />,
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <UsersPage />
                  </Suspense>
                ),
              },
              {
                path: "new",
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <UserFormPage mode="create" />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <UserDetailPage />
                  </Suspense>
                ),
              },
              {
                path: ":id/edit",
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <UserFormPage mode="edit" />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "roles",
            element: <PermissionGuard permission={PERMISSIONS.ROLES_READ} />,
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <RolesPage />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <RoleDetailPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "permissions",
            element: (
              <PermissionGuard permission={PERMISSIONS.PERMISSIONS_READ} />
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<RouteLoader />}>
                    <PermissionsPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
