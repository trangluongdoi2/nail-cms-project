export interface Service {
  id: string
  name: string
  description?: string
  duration: number
  price: number
  category: string
  isActive: boolean
  imageUrl?: string
  createdAt: string
  updatedAt: string
}
