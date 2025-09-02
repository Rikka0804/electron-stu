import axios, { Method } from 'axios'
import { useUserStore } from '@store'
const instance = axios.create({
  baseURL:'/api'
})

instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.token && config.headers) {
      config.headers['Authorization'] = `${store.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    return res.data
  },
  (err) => {
    // TODO 5. 处理401错误
    return Promise.reject(err)
  }
)

export default instance

type Data<T> = {
  code: string
  msg: string
  data: T
}
// 4. 请求工具函数
export const request = <T>(
  url: string,
  method: Method = 'get',
  submitData?: object
) => {
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
