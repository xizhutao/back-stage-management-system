import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import login from '@/store/login'
import roles from './roles'
import rights from './rights'
import goods from './goods'
import params from './params'
import order from './order'
// 数据持久化
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user,
    login,
    roles,
    rights,
    goods,
    params,
    order
  },
  plugins: [vuexLocal.plugin]
})
