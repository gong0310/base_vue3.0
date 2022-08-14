<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/vueX">Vuex</router-link> |
    <router-link to="/pinia">pinia</router-link>
    <button @click="handleRouter">动态路由</button>
  </div>
  <router-view />
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { getRouters } from "./api/get-router";
const router = useRouter();

const initRouter = async () => {
  const result = await getRouters();
  localStorage.setItem('result',JSON.stringify(result))
  result.forEach((v) => {
    router.addRoute({
      path: v.path,
      name: v.name,
      //这儿不能使用@
      component: () => import(`./views/${v.component}`),
    });
    router.push('/demo1')
  });
  console.log(router.getRoutes());
};

const handleRouter=()=>{
  initRouter()
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
