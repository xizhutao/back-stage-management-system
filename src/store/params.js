import { getparamasList, deleteCateParama, editCateParama } from '@/api/params'
export default {
  namespaced: true,
  // 用于存放数据
  state: {
    paramsList: [],
    selectNodeId: ''
  },
  // 用于创建action
  actions: {
    // 获取参数列表
    async getParams ({ commit }, { id, type }) {
      const res = await getparamasList(id, type)
      const { data } = res.data
      commit('updateParams', { data, id })
    },
    // 删除参数
    async deleteParams (_, data) {
      const { cat_id: id, attr_id: attrid } = data
      const res = await deleteCateParama(id, attrid)
      console.log(res)
    },
    // 编辑参数
    async editParamas ({ commit }, payload) {
      const { id, newName, row: { attr_sel: attrSel, attr_id: attrId } } = payload
      await editCateParama(id, attrId, { attr_name: newName, attr_sel: attrSel })
    }
  },
  // 用于修改state
  mutations: {
    // 更新参数列表
    updateParams (state, payload) {
      state.paramsList = payload.data
      state.selectNodeId = payload.id
    },
    // 清空paramsList
    clearParam (state) {
      state.paramsList = []
    }
  }
}
