<template>
  <div class="Pinia">
    <h1>This is an Pinia大菠萝 page</h1>
    <h3>
      实际上，pinia就是Vuex的升级版，官网也说过，为了尊重原作者，所以取名pinia，而没有取名Vuex，
      所以大家可以直接将pinia比作为Vue3的Vuex5.0。
    </h3>
    <h3>为什么要使用pinia？</h3>
    <ul style="text-align: left">
      <li>
        Vue2和Vue3都支持，这让我们同时使用Vue2和Vue3的小伙伴都能很快上手。
      </li>
      <li>
        pinia中只有state、getter、action，抛弃了Vuex中的Mutation、模块,
        pinia中action支持同步和异步
      </li>
      <li>
        无需再创建各个模块嵌套了，Vuex中如果数据过多，我们通常分模块来进行管理，稍显麻烦，而pinia中每个store都是独立的，互相不影响。
      </li>
      <li>更好的Typescript支持，我们Vue3也是推荐使用TS来编写</li>
      <li>体积比vuex小</li>
      <li>pinia支持插件来扩展自身功能。</li>
      <li>支持服务端渲染。</li>
    </ul>
    <img src="../assets/pinia-1.png" alt="" />
    <input type="number" v-model="age" />
    <!-- {{userStore.count}} -->
    <p>age: {{ age }}</p>
    <p>name: {{ name }}</p>
    <p>sex: {{ sex }}</p>
    <p>getAddAge: {{ getAddAge(1000) }}</p>
    <p>getNameAndAge: {{ getNameAndAge }}</p>
    <p>store.getNameAndAge: {{ store.getNameAndAge }}</p>
    <button @click="changeName">changeName</button>
    <button @click="resetStore">reset</button>
    <button @click="changeAll">changeAll</button>
    <button @click="saveName">saveName</button>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "../pinia/user";
import { storeToRefs } from "pinia";
// import { ref } from "vue";

const store = useUserStore();
// 写法1 繁琐，多个组件组件不会响应式
// const name = ref<string>(store.name);
// let age = ref<number>(store.age);
// const sex = ref<string>(store.sex);
// 写法2
// let { name, age, sex } = store; // 直接解构会失去响应式，pinia其实就是把state数据都做了reactive处理
/**
 * 直接解构会失去响应式，使用storeToRefs解决，
 * 类似于toRefs()但专门为 Pinia 设计
 * storeToRefs源码实现过程：
 * 先通过toRaw将store转换成原始对象(防止重复引用)，然后进行forin循环进行toref()，然后return出来
 */
// 把解构出来的数据做ref响应式代理
let { name, age, sex, getAddAge, getNameAndAge } = storeToRefs(store);
// -------------------------------
// 1、修改单个state数据
const changeName = () => {
  // name = "张三"; 不可直接更改

  store.name = "张三";
  console.log(store);
};

// 2、重置store，跟重置表单样
const resetStore = () => {
  store.$reset();
  console.log(store);
};

// 3、修改多个state数据(批量更新)
// 方式一
// const changeAll = () => {
//   store.$patch({
//     name: "李四",
//     age: store.age++,
//   });
// };
// 方式二
const changeAll = () => {
  store.$patch((state) => {
    state.name = "李四";
    state.age++;
  });
};
// 方式三：逻辑比较多可以封装到actions里面
// -------------------------------
// 直接替换整个state对象
// const changeReplace = () => {
//   store.$state = { counter: 666, name: "张三2" };
// };

const saveName = () => {
  // Actions 像 methods 一样被调用：
  store.saveName("我是小猪");
};
</script>
