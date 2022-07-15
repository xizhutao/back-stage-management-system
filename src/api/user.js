import request from '@/utils/request'

/**
 * 登录
 * @param {*} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}
/**
 *获取用户列表
 * @param {*} params
 * @returns
 */
export const getUserList = (params) => {
  return request({
    method: 'GET',
    url: 'users',
    params
  })
}
/**
 *增加用户
 * @param {*} data
 * @returns
 */
export const addUser = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}

/**
 *编辑用户
 * @param {*} data
 * @returns
 */
export const editUser = (target, data) => {
  return request({
    method: 'put',
    url: `users/${target}`,
    data
  })
}
/**
 *删除用户
 * @param {*} target
 * @returns
 */
export const deleteUser = (target) => {
  return request({
    method: 'DELETE',
    url: `users/${target}`
  })
}
/**
 *分配用户角色
 * @param {*} target
 * @returns
 */
export const setUser = (target, rid) => {
  return request({
    method: 'PUT',
    url: `users/${target}/role`,
    data: {
      rid
    }
  })
}
/**
 *修改用户状态
 * @param {*}
 * @returns
 */
export const updateUserState = (target, type) => {
  return request({
    method: 'PUT',
    url: `users/${target}/state/${type}`
  })
}
/**
 *根据id查询用户信息
 * @param {*}
 * @returns
 */
export const getUserMessageById = (target) => {
  return request({
    method: 'GET',
    url: `users/${target}`
  })
}
