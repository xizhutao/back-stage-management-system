import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/welcome', component: () => import('@/views/Welcome') },
      { path: '/userlist', component: () => import('@/views/UserList'), meta: { title: ['用户管理', '用户列表'] } },
      { path: '/rolelist', component: () => import('@/views/RoleList'), meta: { title: ['权限管理', '角色列表'] } },
      { path: '/authorizationlist', component: () => import('@/views/AuthorizationList'), meta: { title: ['权限管理', '权限列表'] } },
      { path: '/goodslist', component: () => import('@/views/GoodsList'), meta: { title: ['商品管理', '商品列表'] } },
      { path: '/cateParams', component: () => import('@/views/CateParams'), meta: { title: ['商品管理', '分类列表'] } },
      { path: '/goodscate', component: () => import('@/views/GoodsCate'), meta: { title: ['商品管理', '商品分类'] } },
      { path: '/order', component: () => import('@/views/orderReceved'), meta: { title: ['订单管理', '订单列表'] } },
      { path: '/404', component: () => import('@/views/404') },
      { path: '*', component: () => import('@/views/404') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
