import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { startTransition } from 'react'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/authService'
import { queryClient } from '@/lib/queryClient'
import type { LoginDto } from '@/types/auth.types'

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user)
      toast.success(`Welcome back, ${data.user.firstName}!`)
      startTransition(() => {
        navigate('/')
      })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? 'Invalid email or password')
    },
  })

  const logout = () => {
    clearAuth()
    queryClient.clear()
    toast.success('Logged out successfully')
    startTransition(() => {
      navigate('/login')
    })
  }

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
  }
}