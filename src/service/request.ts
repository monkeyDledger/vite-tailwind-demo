import axios from 'axios'

// const baseURL = 'https://netease-cloud-music-api-ivory-psi.vercel.app'
const baseURL = 'https://www.xiangdangdang.club'

const request = axios.create({
  baseURL,
  withCredentials: true
})

// 请求前置拦截，url 加上时间戳, headers添加cookie
request.interceptors.request.use((config) => {
  const prefix = config.url?.includes('?') ? '&' : '?'
  config.url += `${prefix}timestamp=${Date.now()}`
  const cookie = localStorage.getItem('cookie')
  if (cookie && config.method === 'post') {
    config.url += `&cookie=${cookie}`
  }
  return config
})

// 响应拦截，返回报文的data
request.interceptors.response.use((response) => {
  return response.data
})

export default request
