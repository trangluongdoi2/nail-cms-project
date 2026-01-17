import { defineStore } from 'pinia'
import type { User, LoginRequest, LoginResponse } from '@/types/auth'
import { UserRole } from '@/types/auth'
import AuthApi from '@/api/auth'
import { IResponse } from '@/types/api'

const authApi = new AuthApi()

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('access_token'),
    loading: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token && !!state.user,
    userRole: (state): UserRole | undefined => state.user?.role,
    isRemember: () => localStorage.getItem('is_remmeber'),
  },

  actions: {
    hasRole(roles: UserRole | UserRole[]): boolean {
      if (!this.user) {
        return false
      }
      const roleArray = Array.isArray(roles) ? roles : [roles]
      return roleArray.includes(this.user.role)
    },

    async login(credentials: LoginRequest): Promise<boolean> {
      this.loading = true
      try {
        const { data }: IResponse<LoginResponse> = await authApi.login(credentials)
        this.token = data.access_token
        this.user = data.user
        localStorage.setItem('access_token', data.access_token)
        if (data.refresh_token) {
          localStorage.setItem('refresh_tokenresh_token', data.refresh_token)
        }
        return true
      } catch {
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },

    async fetchCurrentUser(): Promise<boolean> {
      if (!this.token) {
        return false
      }
      this.loading = true
      try {
        const response = await authApi.getCurrentUser()
        console.log(response, 'response..')
        console.log(response.data, 'response.data..')
        this.user = response.data
        return true
      } catch {
        this.logout()
        return false
      } finally {
        this.loading = false
      }
    },

    async initialize(): Promise<boolean> {
      if (this.token && !this.user) {
        return await this.fetchCurrentUser()
      }
      return this.isAuthenticated
    },
  },
})
