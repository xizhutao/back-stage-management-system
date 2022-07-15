import request from '@/utils/request'
/**
 *获取参数列表
 * @param {*} id
 * @param {*} params
 * @returns
 */
export const getparamasList = (id, params) => {
  return request({
    method: 'GET',
    url: `categories/${id}/attributes`,
    params
  })
}

/**
 *删除参数
 * @param {*} id
 * @param {*} attrid
 * @returns
 */
export const deleteCateParama = (id, attrid) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}/attributes/${attrid}`
  })
}
/**
 *编辑参数
 * @param {*} id
 * @param {*} attrid
 * @returns
 */
export const editCateParama = (id, attrid, data) => {
  return request({
    method: 'PUT',
    url: `categories/${id}/attributes/${attrid}`,
    data
  })
}
