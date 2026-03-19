export const queryKeys = {
  users: {
    all:    ()            => ['users']        as const,
    list:   (p: object)   => ['users', p]     as const,
    detail: (id: number)  => ['users', id]    as const,
  },
  roles: {
    all:    ()            => ['roles']        as const,
    detail: (id: number)  => ['roles', id]    as const,
  },
  permissions: {
    all:    ()            => ['permissions']  as const,
    byRole: (rid: number) => ['permissions', 'role', rid] as const,
  },
}
