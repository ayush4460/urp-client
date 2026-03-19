import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:63823/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// Attach JWT to every request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global error handling
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status
    const method = error.config?.method?.toLowerCase()

    if (status === 401) {
      useAuthStore.getState().clearAuth()
      window.location.href = '/login'
      toast.error('Session expired. Please log in again.')
    } else if (status === 403 && method !== 'get') {
      toast.error('You do not have permission to do this.')
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.')
    }

    return Promise.reject(error)
  }
)