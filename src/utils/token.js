/**
 * 此模块封装了token的获取、设置、清除、根据token判断是否登录
 */

const ADMIN_TOKEN = 'admin_token'
/**
  * 获取token
  * @returns
  */
export const getToken = () => {
  return localStorage.getItem(ADMIN_TOKEN)
}
/**
  * 设置token
  * @param {string} token
  * @returns
  */
export const setToken = (token) => {
  return localStorage.setItem(ADMIN_TOKEN, token)
}
/**
  * 清除token
  * @returns
  */
export const clearToken = () => {
  return localStorage.removeItem(ADMIN_TOKEN)
}
/**
  * 根据token值转成的字符串判断是否登录
  * @returns
  */
export const isAut = () => {
  return !!getToken()
}

// 设置时间戳
export const setStamp = () => {
  return localStorage.setItem('tokenStamp', Date.now())
}
// 清除时间戳
export const clearStamp = () => {
  return localStorage.removeItem('tokenStamp')
}
// 获取时间戳
export const getStamp = () => {
  return localStorage.getItem('tokenStamp')
}
