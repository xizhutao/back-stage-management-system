import { getGoodsList, queryGoodsListById, getCate } from '@/api/goods'
import store from './index'
export default {
  namespaced: true,
  // 用于存放数据
  state: {
    goodList: [],
    total: 0,
    goodsCateList: [],
    total2: 0
  },
  // 用于创建action
  actions: {
    // 获取商品列表
    async getList ({ commit }, data) {
      const res = await getGoodsList(data)
      console.log(res)
      const { goods, total } = res.data.data
      commit('updateGoodsList', { goods, total })
    },
    // 根据id获取商品信息
    async getGoodsMessageById ({ commit }, id) {
      const res = await queryGoodsListById(id)
      const { data } = res.data
      commit('updateQueryGoodsList', data)
    },
    // 获取商品分类列表
    async getGoodsCate ({ commit }) {
      const res = await getCate()
      console.log('getGoodsCate', res)
      const { data } = res.data
      // 分发一个处理数据的action
      const resolvedCateArr = await store.dispatch('goods/matterTree', data)
      commit('updateCate2', resolvedCateArr)
    },
    // 通过页面的大小获取商品分类列表
    async getGoodsCateByPageNum ({ commit }, params) {
      const res = await getCate(params)
      console.log('getGoodsCate', res)
      const { result, total } = res.data.data
      // 分发一个处理数据的action
      const resolvedCateArr = await store.dispatch('goods/matterTree', result)
      commit('updateCate', { resolvedCateArr, total })
    },
    // 数据处理
    matterTree (_, data) {
      for (let i = 0; i < data.length; i++) {
        // 这里面就是处理数据的地方
        data[i] = { label: data[i].cat_name, value: data[i].cat_id, ...data[i] }
        if (data[i].children && data[i].children.length > 0) {
          // children若不为空数组，则继续 递归调用 本方法
          store.dispatch('goods/matterTree', data[i].children)
        }
      }
      return data
    }
  },
  // 用于修改state
  mutations: {
    // 更新用户商品列表
    updateGoodsList (state, payload) {
      state.goodList = payload.goods
      state.total = payload.total
    },
    // 更新列表
    updateQueryGoodsList (state, payload) {
      state.goodList = []
      state.goodList.push(payload)
      state.total = 1
    },
    // 更新商品分类列表
    updateCate (state, payload) {
      state.goodsCateList = payload.resolvedCateArr
      state.total2 = payload.total
    },
    // 更新商品分类列表2
    updateCate2 (state, payload) {
      state.goodsCateList = payload
      state.total = payload.length
    }
  }
}
