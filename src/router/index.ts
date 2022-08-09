import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'Vuex',
    // route level code-splitting
    // this generates a separate chunk (vuex.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "vuex" */ '../views/Vuex.vue')
  },
  {
    path: '/pinia',
    name: 'Pinia',
    // route level code-splitting
    // this generates a separate chunk (Pinia.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Pinia" */ '../views/Pinia.vue')
  }
]
/**
 * 1. new Router 变成 createRouter
 * 2. 新的 history 配置取代 2.0 的mode配置
 * 3. 移动了 base 配置，base 配置被作为 createWebHistory (其他 history 也一样)的第一个参数传递
 * 4. 删除了 *（星标或通配符）路由
 * 5. 3.0的 router.onReady() 函数已被 router.isReady() 取代，该函数不接受任何参数并返回一个 Promise
 * 6. 删除 <router-link> 中的 event 和 tag 属性，使用 v-slot API 来完全自定义
 * 7. 所有的导航现在都是异步的
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.isReady().then(()=>{ // 或者使用 await
  console.log('成功')
}).catch()

export default router
