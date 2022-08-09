import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createPinia } from 'pinia'
// new Vue 变成 createApp 不再是一个类，而是一组函数
// 面向对象编程--->函数式编程
const app = createApp(App);

// 所有组件实例访问到的全局 property 的对象。
// 这是对 Vue 2 中 Vue.prototype 使用方式的一种替代
// 如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级。
app.config.globalProperties.$message = "哈哈哈";
// mounted() {
//     console.log(this.message) // '哈哈哈'
//   }
// getCurrentInstance()?.proxy?.$message // '哈哈哈'
app.use(createPinia());
app.use(store).use(router);
router.isReady().then(() => app.mount('#app'))
// 所有的导航现在都是异步的，如果你使用一个 transition，你可能需要等待路由 ready 好后再挂载程序。否则会有一个初始过渡