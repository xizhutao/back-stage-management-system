import { getUserList, addUser, editUser, deleteUser, setUser, updateUserState, getUserMessageById } from '@/api/user'

export default {
  namespaced: true,
  // 用于存放数据
  state: {
    userList: [],
    pagenum: 1,
    pagesize: 10
  },
  // 用于创建action
  actions: {
    // 获取用户列表
    async UserList ({ state, commit }) {
      const res = await getUserList({ pagenum: state.pagenum, pagesize: state.pagesize })
      const { users } = res.data.data
      commit('updateUserList', users)
    },
    // 添加用户
    async add_user (_, payload) {
      await addUser(payload)
    },
    // 编辑用户
    async edit_user (_, payload) {
      const { rowId, data } = payload
      await editUser(rowId, data)
    },
    // 删除用户
    async DeleteItem (_, payload) {
      await deleteUser(payload)
    },
    // 重新分配角色
    async SetItem (_, payload) {
      const { target, rid } = payload
      return await setUser(target, rid)
    },
    // 改变用户状态
    async changeState (_, payload) {
      const { uid, type } = payload
      return await updateUserState(uid, type)
    },
    // 根据id查询用户的信息
    async getUserMessage ({ commit }, payload) {
      const res = await getUserMessageById(payload)
      if (res.data?.meta.msg === '获取成功') {
        commit('updateUserList', [res.data.data])
      }
    }
  },
  // 用于修改state
  mutations: {
    // 更新用户列表
    updateUserList (state, payload) {
      state.userList = payload
    }
  }
}
