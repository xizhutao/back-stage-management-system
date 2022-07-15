import { getList } from '@/api/order'
export default {
  namespaced: true,
  // 用于存放数据
  state: {
    orderList: []
  },
  // 用于创建action
  actions: {
    async getOrderList ({ commit }) {
      try {
        const res = await getList({ pagenum: 1, pagesize: 10 })
        console.log(res)
        const { goods } = res.data.data
        commit('updateOrderList', goods)
      } catch (error) {
        console.log(error)
      }
    }
  },
  // 用于修改state
  mutations: {
    updateOrderList (state, payload) {
      state.orderList = payload
    }
  }
}
