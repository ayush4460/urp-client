# 🎨 URP Frontend — React + TypeScript + Tailwind CSS

**React 18 · TypeScript · Vite · Tailwind CSS · Zustand · TanStack Query**

## Quick Start
```bash
npm install
npm run dev
# Open http://localhost:5173
# Login: superadmin@urp.local / Admin@123
```

## File Structure — Every file has ONE job
```
src/
├── app/
│   ├── App.tsx              ← Root: QueryClientProvider + RouterProvider + Toaster
│   └── router.tsx           ← All routes: public + protected + permission-gated
│
├── types/
│   ├── api.types.ts         ← ApiResponse<T>, PaginatedResponse<T>, PaginationQuery
│   ├── auth.types.ts        ← LoginDto, LoginResponse
│   ├── user.types.ts        ← UserResponse, CreateUserDto, UpdateUserDto
│   ├── role.types.ts        ← RoleResponse, CreateRoleDto, AssignRoleDto
│   ├── permission.types.ts  ← PermissionResponse, CreatePermissionDto, AssignPermissionDto
│   └── index.ts             ← Re-exports all types
│
├── constants/
│   ├── routes.ts            ← ROUTES object with typed helper functions
│   ├── permissions.ts       ← PERMISSIONS constant object
│   ├── queryKeys.ts         ← TanStack Query key factories
│   └── index.ts
│
├── utils/
│   ├── cn.ts                ← clsx + tailwind-merge helper
│   ├── epoch.ts             ← epochToISTDate, epochToISTDateTime, epochToRelative
│   ├── validators.ts        ← All Zod schemas + inferred types
│   └── index.ts
│
├── store/
│   └── authStore.ts         ← Zustand: token + user persisted in localStorage
│
├── lib/
│   ├── axios.ts             ← Axios instance + JWT interceptor + error handling
│   └── queryClient.ts       ← TanStack QueryClient config
│
├── services/
│   ├── authService.ts       ← login(), register(), getMe()
│   ├── userService.ts       ← getAll(), getById(), create(), update(), delete()
│   ├── roleService.ts       ← getAll(), getById(), create(), update(), delete(), assign(), remove()
│   ├── permissionService.ts ← getAll(), getById(), create(), assign(), remove(), getByRole()
│   └── index.ts
│
├── hooks/
│   ├── useAuth.ts           ← login mutation + logout
│   ├── usePermissionCheck.ts← usePermissionCheck(perm), usePermissionsCheck([perms])
│   ├── useDebounce.ts       ← Delays search input
│   ├── usePagination.ts     ← page, pageSize, search, sort state
│   ├── useUsers.ts          ← useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser, useAssignRole
│   ├── useRoles.ts          ← useRoles, useRole, useCreateRole, useAssignPermission, useRemovePermission
│   ├── usePermissions.ts    ← usePermissions, useCreatePermission
│   └── index.ts
│
├── components/
│   ├── ui/
│   │   ├── Spinner.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── SearchInput.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Table.tsx
│   │   ├── Pagination.tsx
│   │   ├── Modal.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── AuthGuard.tsx        ← Redirects to /login if not authenticated
│   │   ├── PermissionGuard.tsx  ← Redirects to / if lacks permission
│   │   ├── PageHeader.tsx       ← Title + subtitle + breadcrumb + actions slot
│   │   ├── Sidebar.tsx          ← Nav + user info + logout
│   │   ├── Header.tsx           ← Mobile menu button + page title
│   │   ├── AppShell.tsx         ← Desktop sidebar + mobile overlay + main content
│   │   └── index.ts
│   └── features/
│       ├── users/
│       │   └── UserStatusBadge.tsx
│       └── permissions/
│           └── PermissionBadge.tsx
│
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   ├── users/
│   │   ├── UsersPage.tsx        ← Paginated table + search + delete
│   │   ├── UserDetailPage.tsx   ← Profile + roles + permissions
│   │   └── UserFormPage.tsx     ← Create + Edit (mode prop)
│   ├── roles/
│   │   ├── RolesPage.tsx        ← Table + create modal
│   │   └── RoleDetailPage.tsx   ← Permissions grouped by category
│   ├── permissions/
│   │   └── PermissionsPage.tsx  ← Table + create modal
│   ├── profile/
│   │   └── ProfilePage.tsx
│   └── NotFoundPage.tsx
│
├── main.tsx
└── index.css
```
