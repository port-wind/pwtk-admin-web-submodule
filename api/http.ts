import axios from 'axios'
import type { AxiosInstance } from 'axios'

const { VITE_PUBLIC_BIZ_URL } = import.meta.env || 'https://biz-client.pwtk.cc/biz-client/biz'

const instance = (): AxiosInstance => {
  const https = axios.create({
    baseURL: VITE_PUBLIC_BIZ_URL
  })
  return https
}

const http = {
  get: <T>(url: string, data?: any): Promise<T> => {
    return instance().get(url, { params: data ? { data: data } : '' })
  },
  post: <T>(url: string, data: any): Promise<T> => {
    return instance().post(url, data)
  },
  put: <T>(url: string, data: any): Promise<T> => {
    return instance().put(url, data)
  },
  delete: <T>(url: string, data: any): Promise<T> => {
    return instance().delete(url, { data: data })
  },
  patch: <T>(url: string, data: any): Promise<T> => {
    return instance().patch(url, { data: data })
  }
}

export default http
