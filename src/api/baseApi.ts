export { default as axiosInstance } from './axios'
import { AxiosRequestConfig } from 'axios'
import axiosInstance from './axios'
import { IResponse, IPaginatedResponse } from '@/types/api'

export interface IApi {
  getList<T>(
    url: string,
    input?: object,
    options?: AxiosRequestConfig<T>
  ): Promise<IPaginatedResponse<T>>
  get<T>(url: string, input?: object, options?: AxiosRequestConfig<T>): Promise<IResponse<T>>
  post<T>(url: string, input: object, options?: AxiosRequestConfig<T>): Promise<IResponse<T>>
  put<T>(url: string, input: object, options?: AxiosRequestConfig<T>): Promise<IResponse<T>>
  patch<T>(url: string, input: object, options?: AxiosRequestConfig<T>): Promise<IResponse<T>>
  delete<T>(url: string, input?: object, options?: AxiosRequestConfig<T>): Promise<IResponse<T>>
}

export class BaseApi implements IApi {
  public async getList<T>(
    url: string,
    params?: object,
    options?: AxiosRequestConfig<T>
  ): Promise<IPaginatedResponse<T>> {
    let opts: AxiosRequestConfig = { ...(options || {}) }

    let queryContent = ''
    if (Object.keys(params || {})?.length) {
      queryContent = Object.entries(params || {})
        .map(([key, value]) => {
          if (value != undefined) {
            return `${key}=${value}`
          }
          return ''
        })
        .filter(Boolean)
        .join('&')
    }
    const { data } = await axiosInstance.get(`${url}?${queryContent}`, opts)

    return {
      items: data.items,
      total: data.total,
      page: data.page,
      limit: data.limit,
      totalPages: data.totalPages,
    }
  }
  public async get<T>(
    url: string,
    params?: object,
    options?: AxiosRequestConfig<T>
  ): Promise<IResponse<T>> {
    let opts = { ...(options || {}) }

    return axiosInstance.get(url, opts)
  }

  public async post<T>(url: string, input?: object, options?: object): Promise<IResponse<T>> {
    return axiosInstance.post(url, input, options)
  }

  public async patch<T>(url: string, input?: object, options?: object): Promise<IResponse<T>> {
    return axiosInstance.patch(url, input, options)
  }

  public async put<T>(url: string, input?: object, options?: object): Promise<IResponse<T>> {
    return axiosInstance.put(url, input, options)
  }

  public async delete<T>(url: string, input?: object): Promise<IResponse<T>> {
    return axiosInstance.delete(url, input)
  }
}
