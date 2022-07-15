import { getAuthorizationList, getTreeAuthorization } from '@/api/authorization'
import { addRolesRight, deleteRolesRight } from '@/api/roles'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  // 用于存放数据
  state: {
    rightList: [],
    menuRight: []
  },
  // 用于创建action
  actions: {
    // 获取所有的权限列表
    async getRightList ({ commit }, payload) {
      const res = await getAuthorizationList(payload)
      const { data } = res.data
      commit('updateRightList', data)
    },
    // 获取左侧菜单权限列表
    async TreeAuthorization ({ commit }) {
      const res = await getTreeAuthorization('tree')
      const { data } = res.data
      commit('updateMenuList', data)
    },
    // 删除指定的角色的指定权限
    async deleteRolesRight (_, { roleId, rightId }) {
      try {
        const res = await deleteRolesRight(roleId, rightId)
        if (res.data.meta.status === 200) {
          Message.success('取消权限成功')
        } else {
          Message.error('操作失败')
        }
      } catch (err) {
        Message.error(err.message)
      }
    },
    // 角色授权
    async addRight (_, { roleId, rids }) {
      console.log(roleId, rids)
      const res = await addRolesRight(roleId, rids)
      if (res.data.meta.status === 200) {
        Message({
          type: 'success',
          message: '设置权限成功',
          duration: 1000
        })
      }
    }
  },
  // 用于修改state
  mutations: {
    updateRightList (state, payload) {
      state.rightList = payload
    },
    updateMenuList (state, payload) {
      state.menuRight = payload
    }
  }
}
