import { IPaginationParams, IResponse } from '@/types/api'
import { IService } from '@/types/service'
import { BaseApi } from './baseApi'

export interface ServiceFilterParams extends IPaginationParams {
  search?: string
  is_active?: boolean
}

class ServiceApi extends BaseApi {
  getAll(params?: ServiceFilterParams) {
    return this.getList<IService>('/service-offerings', params)
  }

  getById(id: string) {
    return this.get<IResponse<IService>>(`/service-offerings/${id}`)
  }

  create(data: Partial<IService>) {
    return this.post<IResponse<IService>>('/service-offerings', data)
  }

  update(id: string, data: Partial<IService>) {
    return this.put<IResponse<IService>>(`/service-offerings/${id}`, data)
  }

  deleteService(id: string) {
    return this.delete<IResponse<void>>(`/service-offerings/${id}`)
  }
}

export default new ServiceApi()
