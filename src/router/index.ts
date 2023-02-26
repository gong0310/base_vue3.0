import { createRouter, createWebHistory,createWebHashHistory,RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/vuex",
    name: "Vuex",
    // route level code-splitting
    // this generates a separate chunk (vuex.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "vuex" */ "../views/Vuex.vue"),
  },
  {
    path: "/pinia",
    name: "Pinia",
    // route level code-splitting
    // this generates a separate chunk (Pinia.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Pinia" */ "../views/Pinia.vue"),
  },
];

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
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // 通过浏览器的 前进/后退 按钮触发 时，保存上一次的滚动位置
    } else {
      return {
        top: 0,
      };
    }
  },
});

import { getRouters, RouterItem } from "../api/get-router";

const initRouter = async () => {
  let result: RouterItem[] = [];
  if (localStorage.getItem("result")) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    result = await JSON.parse(localStorage.getItem("result")!);
  } else {
    result = await getRouters();
  }
  result.forEach((v: RouterItem) => {
    router.addRoute({
      path: v.path,
      name: v.name,
      //这儿不能使用@
      component: () => import(`../views/${v.component}`),
    });
  });
  console.log(router.getRoutes());
};
let getRouter = true; // 不加这个判断，路由会陷入死循环 （如果没有路由)
router.beforeEach(async (to, from, next) => {
  if (getRouter) {
    await initRouter();
    getRouter = false;
    next({
      ...to, // next({ ...to })的目的,是保证路由添加完了再进入页面 (可以理解为重进一次)
      replace: true, // 重进一次, 不保留重复历史
    });
  } else {
    next();
  }
});
router
  .isReady()
  .then(() => {
    // 或者使用 await
    console.log("成功");
  })
  .catch();

export default router;
