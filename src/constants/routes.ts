export const ROUTES = {
  LOGIN:       '/login',
  REGISTER:    '/register',
  DASHBOARD:   '/',
  PROFILE:     '/profile',
  USERS:       '/users',
  USER_NEW:    '/users/new',
  USER_DETAIL: (id: number | string) => `/users/${id}`,
  USER_EDIT:   (id: number | string) => `/users/${id}/edit`,
  ROLES:       '/roles',
  ROLE_DETAIL: (id: number | string) => `/roles/${id}`,
  PERMISSIONS: '/permissions',
} as const
