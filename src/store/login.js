import { getToken, clearToken, setStamp } from '@/utils/token'
export default {
  namespaced: true,
  // 用于存放数据
  state: {
    token: getToken() || ''
  },
  // 用于创建action
  actions: {
    // 清除token和缓存
    clearToken ({ commit }) {
      clearToken() // 移除本地储存的token
      commit('reserveToken', '')
    }
  },
  // 用于修改state
  mutations: {
    reserveToken (state, payload) {
      state.token = payload
      setStamp()
    },
    updateToken (state) {
      state.token = ''
    }
  }
}
