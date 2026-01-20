import { IPaginationParams } from '@/types/api'
import { IStaff } from '@/types/staff'
import { BaseApi } from './baseApi'

export interface IStaffFilterParams extends IPaginationParams {
  search?: string
  role?: string
  is_active?: boolean
}

class StaffApi extends BaseApi {
  getAll(params?: IStaffFilterParams) {
    return this.getList<IStaff>('/staffs', params)
  }

  getById(id: string) {
    return this.get<IStaff>(`/staffs/${id}`)
  }

  create(data: Partial<IStaff>) {
    return this.post<IStaff>('/staffs', data)
  }

  update(id: string, data: Partial<IStaff>) {
    return this.put<IStaff>(`/staffs/${id}`, data)
  }

  deleteStaff(id: string) {
    return this.delete<void>(`/staffs/${id}`)
  }
}

export default new StaffApi()
