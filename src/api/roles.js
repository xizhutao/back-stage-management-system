import request from '@/utils/request'
/**
 * 获取角色列表
 * @returns
 */
export const getRolesList = () => {
  return request({
    method: 'GET',
    url: 'roles'
  })
}

/**
 * 删除角色指定权限
 * @returns
 */
export const deleteRolesRight = (roleId, rightId) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

/**
 * 角色授权
 * @returns
 */
export const addRolesRight = (roleId, rids) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
