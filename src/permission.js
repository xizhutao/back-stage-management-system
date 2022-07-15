// 路由守卫
import router from './router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404']
// 前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.login.token
  // 开启进度条
  nprogress.start()
  // 1、判断是否有token
  if (token) {
    // 有token去登录页面
    if (to.path === '/login') {
      next('/welcome')
    } else {
      // 有token不去登录页面 ,放行
      next()
    }
  } else {
    // 没有token是否去白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  // 关闭进度条
  nprogress.done()
})

// 路由后置守卫
router.afterEach(() => {
  nprogress.done()
})
