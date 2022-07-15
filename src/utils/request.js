import axios from 'axios'
import store from '@/store'
import { getStamp, clearToken, clearStamp } from './token'
import router from '@/router'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})

// 添加请求拦截器
// 1、token注入
// 2、token失效主动介入
request.interceptors.request.use(async function (config) {
  // 在发送请求之前添加token
  if (store.state.login.token) {
    const token = store.state.login.token
    console.log(22)
    // 判断token是否超时，如果token超时，直接跳转登录页面
    if (isOvertime()) {
      // 清除时间戳
      clearStamp()
      // 清除本地token
      clearToken()
      // 清除vuex上token
      await store.commit('login/updateToken')
      // 跳转登录页面
      router.push('/login')
      Message.error('token失效')
    }
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
// token失效的被动介入
// 响应拦截器进行错误处理
// request.interceptors.response.use(response => {
//   console.log(response)
//   const { data, meta } = response.data
//   if (meta.msg === '登录成功') {
//     Message.success('登录成功')
//     return data
//   } else {
//     Message.error(meta.msg)
//     return Promise.reject(new Error(meta.msg))
//   }
// }, error => {
//   Message.error(error.message)
//   return Promise.reject(error.message)
// })
const overtime = 20000000
const isOvertime = () => {
  const currentTime = Date.now()
  const tokenStamp = getStamp()
  return (currentTime - tokenStamp) / 1000 > overtime
}
export default request
