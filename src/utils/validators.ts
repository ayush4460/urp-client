import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'At least 8 characters')
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[0-9]/, 'Must contain a digit')
  .regex(/[^a-zA-Z0-9]/, 'Must contain a special character')

export const loginSchema = z.object({
  email:    z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  firstName:       z.string().min(1, 'Required').max(100),
  lastName:        z.string().min(1, 'Required').max(100),
  username:        z.string().min(3, 'Min 3 characters').max(50)
                    .regex(/^[a-zA-Z0-9_.\-]+$/, 'Letters, numbers, _ . - only'),
  email:           z.string().email('Invalid email'),
  password:        passwordSchema,
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match', path: ['confirmPassword'],
})

export const updateUserSchema = z.object({
  firstName:          z.string().min(1).max(100).optional(),
  lastName:           z.string().min(1).max(100).optional(),
  username:           z.string().min(3).max(50).optional(),
  isActive:           z.boolean().optional(),
  currentPassword:    z.string().optional(),
  newPassword:        z.string().optional(),
  confirmNewPassword: z.string().optional(),
}).refine(d => {
  if (!d.newPassword || d.newPassword.length === 0) return true
  return d.newPassword.length >= 8
}, {
  message: 'Password must be at least 8 characters',
  path: ['newPassword'],
}).refine(d => {
  if (!d.newPassword || d.newPassword.length === 0) return true
  return /[A-Z]/.test(d.newPassword)
}, {
  message: 'Must contain an uppercase letter',
  path: ['newPassword'],
}).refine(d => {
  if (!d.newPassword || d.newPassword.length === 0) return true
  return /[a-z]/.test(d.newPassword)
}, {
  message: 'Must contain a lowercase letter',
  path: ['newPassword'],
}).refine(d => {
  if (!d.newPassword || d.newPassword.length === 0) return true
  return /[0-9]/.test(d.newPassword)
}, {
  message: 'Must contain a digit',
  path: ['newPassword'],
}).refine(d => {
  if (!d.newPassword || d.newPassword.length === 0) return true
  return /[^a-zA-Z0-9]/.test(d.newPassword)
}, {
  message: 'Must contain a special character',
  path: ['newPassword'],
}).refine(d => {
  if (!d.newPassword || d.newPassword.length === 0) return true
  return d.newPassword === d.confirmNewPassword
}, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword'],
}).refine(d => {
  if (!d.newPassword || d.newPassword.length === 0) return true
  return !!d.currentPassword && d.currentPassword.length > 0
}, {
  message: 'Current password is required to change password',
  path: ['currentPassword'],
})

export const createRoleSchema = z.object({
  name:        z.string().min(2).max(50),
  description: z.string().max(255).optional(),
})

export const createPermissionSchema = z.object({
  name:        z.string().min(2).max(100)
                .regex(/^[a-z]+:[a-z_]+$/, 'Format: resource:action (e.g. users:read)'),
  description: z.string().max(255).optional(),
  group:       z.string().min(1, 'Group is required').max(50),
})

export type LoginForm            = z.infer<typeof loginSchema>
export type RegisterForm         = z.infer<typeof registerSchema>
export type UpdateUserForm       = z.infer<typeof updateUserSchema>
export type CreateRoleForm       = z.infer<typeof createRoleSchema>
export type CreatePermissionForm = z.infer<typeof createPermissionSchema>
