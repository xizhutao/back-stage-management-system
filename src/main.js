import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'
import TreeTable from 'vue-table-with-tree-grid'
import '@/permission' // 权限控制
Vue.component('tree-table', TreeTable)
Vue.config.productionTip = false
Vue.use(ElementUI)
// 全局过滤器
Vue.filter('formatTime', function (value) {
  if (!value) return ''
  return dayjs(value).format('YYYY-MM-DD')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
