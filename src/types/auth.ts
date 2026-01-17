export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  created_at?: string
  updated_at?: string
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  access_token: string
  refresh_token?: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}
