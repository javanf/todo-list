import axios from 'axios'
// import qs from 'querystring'

// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: 60000 // 设置超时时间为1分钟
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const headers = config.headers = config.headers || {}
  // 在发送请求之前做些什么
  if (config.json) {
    headers['Content-Type'] = 'application/json; charset=UTF-8'
    delete config.json
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
