import request from '@/utils/request'
/**
 * 获取商品列表数据
 * @param {*} params
 * @returns
 */
export const getGoodsList = (params) => {
  return request({
    method: 'GET',
    url: 'goods',
    params
  })
}

/**
 * 根据id查询商品
 * @param {*} id
 * @returns
 */
export const queryGoodsListById = (id) => {
  return request({
    method: 'GET',
    url: `goods/${id}`
  })
}

/**
 * 获取商品分类
 * @param {*}
 * @returns
 */
export const getCate = (params) => {
  return request({
    method: 'GET',
    url: 'categories',
    params

  })
}
