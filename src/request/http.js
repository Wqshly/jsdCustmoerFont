// 封装axios
// import  Vue from 'vue'
import axios from 'axios'
// import router from '../router'

const service = axios.create({
  // 设置跨域代理接口统一的前置地址
  baseURL: '/api',
  timeout: 1000 * 3
})

service.interceptors.response.use()

export default service
