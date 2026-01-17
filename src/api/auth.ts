import { BaseApi } from './baseApi'
import type { LoginRequest, LoginResponse, User, RegisterRequest } from '@/types/auth'
import type { IResponse } from '@/types/api'
import axiosInstance from './axios'

export default class AuthApi extends BaseApi {
  login(credentials: LoginRequest): Promise<IResponse<LoginResponse>> {
    return axiosInstance.post('/auth/login', credentials)
  }

  register(data: RegisterRequest): Promise<IResponse<User>> {
    return this.post<User>('/auth/register', data)
  }

  getCurrentUser(): Promise<IResponse<User>> {
    return this.get<User>('/auth/me')
  }

  refreshToken(refreshToken: string): Promise<IResponse<LoginResponse>> {
    return axiosInstance.post('/auth/refresh', { refreshToken })
  }

  logout(): Promise<IResponse<void>> {
    return this.post<void>('/auth/logout', {})
  }
}
