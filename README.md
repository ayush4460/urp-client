# 🛡️ URP Frontend — User Role Permission Management System

> A full-featured admin dashboard to manage users, assign roles, and control who can access what.
> Built with **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## 📖 What Does This App Do?

Imagine you're running a company and you need to control **who can do what** inside your software.

- Some people are **Admins** — they can create users, assign roles, delete accounts
- Some people are **Managers** — they can only view users, not edit them
- Some people are just **Users** — they can only see their own profile

This app is the **control panel** for all of that.

### Think of it like a building's security system:

| Concept | Real World Example |
|---|---|
| **User** | A person who works in the building |
| **Role** | Their job title (Admin, Manager, Security Guard) |
| **Permission** | Which doors they're allowed to open (`users:read`, `roles:assign`) |
| **JWT Token** | Their ID badge — proves who they are at every checkpoint |

When someone logs in, they get a digital badge (JWT token). Every time they try to do something, the app checks the badge and either lets them in or says **"You do not have permission to do this."**

---

## ✨ Features

### 🔐 Authentication
- Login with email and password
- Register a new account (auto-assigned the default User role)
- JWT token stored securely, survives page refresh
- Auto logout when session expires
- Protected routes — can't access any page without being logged in

### 📊 Dashboard
- Overview stat cards — total users, total roles, total permissions
- Shows your own roles and permissions at a glance
- Stat cards only appear for things you have permission to read

### 👥 User Management *(Admin only)*
- View all users in a paginated, searchable table
- Create new users with strong password validation
- Edit any user's name, username, and optionally change their password
- Soft-delete users (data kept in database for audit — not permanently erased)
- View a user's full profile with their assigned roles and all effective permissions

### 🔐 Role Management *(Admin only)*
- View all roles and how many permissions each one has
- Create new roles with a name and description
- View role detail — permissions neatly grouped by category
- Assign or remove permissions from any role instantly

### 🔑 Permission Management *(Admin only)*
- View all system permissions grouped by resource
- Create new permissions following `resource:action` format (e.g. `reports:export`)
- Assign or remove permissions from roles

### 👤 Own Profile *(Every logged-in user)*
- View your own profile with full IST timestamps
- Edit your own first name, last name, username
- Change your own password (requires current password for security)
- No special admin permission needed — every user controls their own account

### 📱 Fully Responsive
- Works on phone, tablet, and desktop
- Collapsible sidebar on mobile with a backdrop overlay
- All data tables support horizontal scroll on small screens
- Modals appear as bottom sheets on mobile, centered on desktop

---

## 🛠️ Tech Stack

| Technology | Version | What It Does |
|---|---|---|
| **React** | 18.x | The core UI library — builds every component, page, and interaction |
| **TypeScript** | 5.x | Adds strict types to catch bugs before the app even runs |
| **Vite** | 5.x | Ultra-fast dev server — changes show in the browser instantly |
| **Tailwind CSS** | 3.x | Styles everything with small utility classes — no separate CSS files |
| **React Router DOM** | 6.x | Client-side navigation between pages without full reload |
| **Zustand** | 4.x | Stores login state (token + user) globally — persists after page refresh |
| **TanStack Query** | 5.x | Fetches API data, caches it smartly, and auto-refreshes when needed |
| **Axios** | 1.x | Makes HTTP requests to the backend — auto-attaches JWT token to every request |
| **React Hook Form** | 7.x | Manages forms efficiently with minimal re-renders |
| **Zod** | 3.x | Validates all form inputs on the frontend before sending to backend |
| **React Hot Toast** | 2.x | Shows success, error, and info notifications in the corner |
| **Lucide React** | — | Clean, consistent icon library used throughout the UI |
| **clsx + tailwind-merge** | — | Safely combines Tailwind classes without conflicts |
| **date-fns** | 3.x | Formats dates and relative time (e.g. "2 hours ago") |

---

## 🏗️ Project Architecture

Every file has **exactly one job**. No file does two things. This makes it easy to find code, fix bugs, and add new features without breaking anything.

```
src/
├── app/
│   ├── App.tsx              ← Root: QueryClientProvider + RouterProvider + Toaster
│   └── router.tsx           ← All routes: public + protected + permission-gated
│
├── types/                   ← TypeScript interfaces — the exact shape of every API response
│   ├── api.types.ts         ← ApiResponse<T>, PaginatedResponse<T>, PaginationQuery
│   ├── auth.types.ts        ← LoginDto, LoginResponse
│   ├── user.types.ts        ← UserResponse, CreateUserDto, UpdateUserDto
│   ├── role.types.ts        ← RoleResponse, CreateRoleDto, AssignRoleDto
│   ├── permission.types.ts  ← PermissionResponse, CreatePermissionDto, AssignPermissionDto
│   └── index.ts             ← Re-exports all types
│
├── constants/               ← Fixed values used across the whole app
│   ├── routes.ts            ← ROUTES object with typed path helpers
│   ├── permissions.ts       ← PERMISSIONS constants (e.g. 'users:read')
│   ├── queryKeys.ts         ← TanStack Query key factories for cache management
│   └── index.ts
│
├── utils/                   ← Pure helper functions — no side effects
│   ├── cn.ts                ← Safely merges Tailwind CSS classes
│   ├── epoch.ts             ← Converts Unix epoch seconds → IST for display
│   ├── validators.ts        ← All Zod schemas + inferred TypeScript types
│   └── index.ts
│
├── store/
│   └── authStore.ts         ← Zustand global state: token + user in localStorage
│
├── lib/
│   ├── axios.ts             ← Axios instance + auto JWT header + 401/403 handling
│   └── queryClient.ts       ← TanStack QueryClient config (stale time, retry etc.)
│
├── services/                ← All raw API call functions — one file per resource
│   ├── authService.ts       ← login(), register(), getMe()
│   ├── userService.ts       ← getAll(), getById(), create(), update(), delete()
│   ├── roleService.ts       ← getAll(), getById(), create(), update(), delete(), assign(), remove()
│   ├── permissionService.ts ← getAll(), getById(), create(), assign(), remove(), getByRole()
│   └── index.ts
│
├── hooks/                   ← Custom React hooks — wrap services with TanStack Query
│   ├── useAuth.ts           ← login mutation + logout
│   ├── usePermissionCheck.ts← usePermissionCheck(perm), usePermissionsCheck([perms])
│   ├── useDebounce.ts       ← Delays search — no API call on every single keypress
│   ├── usePagination.ts     ← page, pageSize, search, sort state all in one place
│   ├── useUsers.ts          ← useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser, useAssignRole
│   ├── useRoles.ts          ← useRoles, useRole, useCreateRole, useAssignPermission, useRemovePermission
│   ├── usePermissions.ts    ← usePermissions, useCreatePermission
│   └── index.ts
│
├── components/
│   ├── ui/                  ← Reusable building blocks used on every page
│   │   ├── Spinner.tsx      ← Animated loading circle (3 sizes)
│   │   ├── Button.tsx       ← 5 variants: primary, secondary, danger, ghost, outline
│   │   ├── Input.tsx        ← Text input with label, error message, and hint text
│   │   ├── Select.tsx       ← Dropdown with label and validation error
│   │   ├── Badge.tsx        ← Small coloured label pill (success, danger, info, purple)
│   │   ├── Avatar.tsx       ← Auto-coloured initials circle based on name
│   │   ├── SearchInput.tsx  ← Search box with magnifier icon built in
│   │   ├── EmptyState.tsx   ← "No results found" placeholder with icon and action slot
│   │   ├── Table.tsx        ← Generic typed data table with loading and empty states
│   │   ├── Pagination.tsx   ← Previous / Next controls with total count display
│   │   ├── Modal.tsx        ← Overlay popup (bottom sheet on mobile, centered on desktop)
│   │   ├── ConfirmDialog.tsx← "Are you sure?" danger popup with loading state
│   │   └── index.ts
│   │
│   ├── layout/              ← App structure and navigation components
│   │   ├── AuthGuard.tsx    ← Redirects to /login if not authenticated
│   │   ├── PermissionGuard.tsx ← Redirects to / if user lacks required permission
│   │   ├── PageHeader.tsx   ← Title + subtitle + breadcrumb + action buttons slot
│   │   ├── Sidebar.tsx      ← Left nav with permission-filtered links + user info + logout
│   │   ├── Header.tsx       ← Top bar with mobile hamburger button + page title
│   │   ├── AppShell.tsx     ← Desktop sidebar + mobile overlay + main scrollable area
│   │   └── index.ts
│   │
│   └── features/            ← Small domain-specific display components
│       ├── users/
│       │   └── UserStatusBadge.tsx   ← Green "Active" / Red "Inactive" badge
│       └── permissions/
│           └── PermissionBadge.tsx   ← Monospace colour-coded permission key badge
│
├── pages/                   ← One file per screen in the app
│   ├── auth/
│   │   ├── LoginPage.tsx        ← Email + password login form with default credential hint
│   │   └── RegisterPage.tsx     ← Full registration form with strong password validation
│   ├── dashboard/
│   │   └── DashboardPage.tsx    ← Permission-gated stat cards + your roles/permissions
│   ├── users/
│   │   ├── UsersPage.tsx        ← Searchable paginated table with view/edit/delete actions
│   │   ├── UserDetailPage.tsx   ← Full user profile + role assignment panel + permissions list
│   │   └── UserFormPage.tsx     ← Create and Edit user in one component using a mode prop
│   ├── roles/
│   │   ├── RolesPage.tsx        ← Role list table + inline create modal
│   │   └── RoleDetailPage.tsx   ← Role permissions grouped by category + assign/remove panel
│   ├── permissions/
│   │   └── PermissionsPage.tsx  ← All permissions table + inline create modal
│   ├── profile/
│   │   ├── ProfilePage.tsx      ← Own profile view with IST timestamps
│   │   └── ProfileEditPage.tsx  ← Edit own name, username, and change password
│   └── NotFoundPage.tsx         ← Clean 404 page with a go home button
│
├── main.tsx                 ← React app entry point
└── index.css                ← Tailwind directives + custom scrollbar styles
```

---

## ⏱️ Timestamps — All Displayed in IST

All timestamps from the API are **Unix epoch seconds (UTC)** — a plain number like `1735689600`. These helpers in `src/utils/epoch.ts` convert them to **Indian Standard Time (IST, UTC+5:30)**:

```ts
epochToISTDate(1735689600)       // → "01 Jan 2025"
epochToISTDateTime(1735689600)   // → "01 Jan 2025, 05:30 AM IST"
epochToRelative(1735689600)      // → "2h ago" / "3d ago" / "just now"
```

---

## 🔐 How Login and Permissions Work

```
1. You type email + password and click Sign In
2. Axios sends POST /api/v1/users/login to the backend
3. Backend verifies password and returns a signed JWT access token
4. Zustand saves the token + user info to localStorage (survives refresh)
5. Every future API request automatically includes:
      Authorization: Bearer eyJhbGci...
6. If the server returns 401 → Zustand clears auth → you're sent to /login
7. Every page is protected by two guards:
      AuthGuard       → Are you logged in at all?
      PermissionGuard → Do you have the specific permission for this page?
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18 or 20 LTS** → https://nodejs.org
- **URP Backend running** → follow the backend README to start it first

### Install and Run

```bash
# Step 1 — Install all packages (first time only, ~1 minute)
npm install

# Step 2 — Configure backend URL
# Create a .env file in the project root:
VITE_API_URL=https://localhost:63823/api/v1

# Step 3 — Start the development server
npm run dev

# Step 4 — Open in your browser
http://localhost:5173
```

### Default Login
```
Email:    superadmin@urp.local
Password: Admin@123
```

---

## 📜 Available Scripts

```bash
npm run dev        # Start dev server with instant hot reload
npm run build      # Build optimised production bundle → dist/
npm run preview    # Preview the production build locally
npm run typecheck  # Run TypeScript type checking without building
```

---

## 🔗 Related

- **Backend Repository** → [urp-backend](https://github.com/ayush4460/urp-backend) — .NET 8 Clean Architecture REST API
- **Live API Docs** → `https://localhost:63823/swagger` (when backend is running)

---

*Built with ❤️ using React 18, TypeScript, Tailwind CSS, and clean separation of concerns.*
