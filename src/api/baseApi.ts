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
    input?: object,
    options?: AxiosRequestConfig<T>
  ): Promise<IPaginatedResponse<T>> {
    let opts = { ...(options || {}) }
    const { data } = await axiosInstance.get(url, opts)
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
    input?: object,
    options?: AxiosRequestConfig<T>
  ): Promise<IResponse<T>> {
    let opts = { ...(options || {}) }
    if (input) {
      opts = {
        ...opts,
        params: input,
      }
    }
    const { data } = await axiosInstance.get(url, opts)
    return {
      data,
    }
  }

  public async post<T>(url: string, input?: object, options?: object): Promise<IResponse<T>> {
    const { data } = await axiosInstance.post(url, input, options)
    return {
      data: data.data,
      message: data.message,
    }
  }

  public async patch<T>(url: string, input?: object, options?: object): Promise<IResponse<T>> {
    const { data } = await axiosInstance.patch(url, input, options)
    return {
      data: data.data,
      message: data.message,
    }
  }

  public async put<T>(url: string, input?: object, options?: object): Promise<IResponse<T>> {
    const { data } = await axiosInstance.put(url, input, options)
    return {
      data: data.data,
      message: data.message,
    }
  }

  public async delete<T>(url: string, input?: object): Promise<IResponse<T>> {
    const { data } = await axiosInstance.delete(url, input)
    return {
      data: data.data,
      message: data.message,
    }
  }
}
