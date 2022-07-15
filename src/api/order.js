import request from '@/utils/request'

export const getList = (params) => {
  return request({
    method: 'GET',
    url: 'orders',
    params
  })
}
