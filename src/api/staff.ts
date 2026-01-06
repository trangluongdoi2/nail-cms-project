import { IPaginatedResponse, IPaginationParams, IResponse } from '@/types/api'
import { Staff } from '@/types/staff'
import { BaseApi } from './baseApi'

export default class StaffApi extends BaseApi {
  getAll(params?: IPaginationParams) {
    return this.get<IPaginatedResponse<Staff>>('/staffs', { params })
  }

  getById(id: string) {
    return this.get<IResponse<Staff>>(`/staffs/${id}`)
  }

  create(data: Partial<Staff>) {
    return this.post<IResponse<Staff>>('/staffs', data)
  }

  update(id: string, data: Partial<Staff>) {
    return this.put<IResponse<Staff>>(`/staffs/${id}`, data)
  }

  deleteStaff(id: string) {
    return this.delete<IResponse<void>>(`/staffs/${id}`)
  }
}
