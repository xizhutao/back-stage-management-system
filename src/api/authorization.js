import request from '@/utils/request'
/**
 *获取所有权限信息
 * @param {*} type
 * @returns
 */
export const getAuthorizationList = (type) => {
  return request({
    method: 'GET',
    url: `rights/${type}`
  })
}
/**
 *获取树形菜单权限
 * @param {*} type
 * @returns
 */
export const getTreeAuthorization = (type) => {
  return request({
    method: 'GET',
    url: `rights/${type}`
  })
}
