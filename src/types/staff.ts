export interface IStaff {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: 'admin' | 'technician' | 'receptionist'
  specialties: string[]
  is_active: boolean
  image_url?: string
  created_at: string
  updated_at: string
}
