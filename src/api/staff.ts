import { IPaginationParams } from '@/types/api'
import { Staff } from '@/types/staff'
import { BaseApi } from './baseApi'

export interface StaffFilterParams extends IPaginationParams {
  search?: string
  role?: string
  is_active?: boolean
}

class StaffApi extends BaseApi {
  getAll(params?: StaffFilterParams) {
    return this.getList<Staff>('/staffs', params)
  }

  getById(id: string) {
    return this.get<Staff>(`/staffs/${id}`)
  }

  create(data: Partial<Staff>) {
    return this.post<Staff>('/staffs', data)
  }

  update(id: string, data: Partial<Staff>) {
    return this.put<Staff>(`/staffs/${id}`, data)
  }

  deleteStaff(id: string) {
    return this.delete<void>(`/staffs/${id}`)
  }
}

export default new StaffApi()
