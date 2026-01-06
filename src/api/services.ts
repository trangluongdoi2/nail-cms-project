import { IPaginatedResponse, IPaginationParams, IResponse } from '@/types/api'
import { Service } from '@/types/service'
import { BaseApi } from './baseApi'

export default class ServiceApi extends BaseApi {
  getAll(params?: IPaginationParams) {
    return this.get<IPaginatedResponse<Service>>('/services', { params })
  }

  getById(id: string) {
    return this.get<IResponse<Service>>(`/services/${id}`)
  }

  create(data: Partial<Service>) {
    return this.post<IResponse<Service>>('/services', data)
  }

  update(id: string, data: Partial<Service>) {
    return this.put<IResponse<Service>>(`/services/${id}`, data)
  }

  deleteService(id: string) {
    return this.delete<IResponse<void>>(`/services/${id}`)
  }
}
