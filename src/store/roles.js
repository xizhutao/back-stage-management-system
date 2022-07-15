import { getRolesList } from '@/api/roles'
export default {
  namespaced: true,
  // 用于存放数据
  state: {
    roleList: []
  },
  // 用于创建action
  actions: {
    // 获取角色列表
    async RoleList ({ commit }) {
      const res = await getRolesList()
      const { data } = res.data
      commit('updateRoleList', data)
    }
  },
  // 用于修改state
  mutations: {
    updateRoleList (state, payload) {
      state.roleList = payload
    }
  }
}
