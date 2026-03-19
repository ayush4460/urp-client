import type { UserResponse } from './user.types'

export interface LoginDto {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  refreshToken: string
  user: UserResponse
}
