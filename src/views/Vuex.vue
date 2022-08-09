<template>
  <div class="vuex">
    <h1>This is an vuex page Vuex 是基于vue的一种比较流行的状态管理工具，简单来说就是存储数据的地方，可以让每个组件都能访问到</h1>
    全新的“useStore”组合式函数
  </div>
</template>
<script lang="ts">
import { defineComponent,computed } from "vue";
import { useStore } from "vuex";
// vue3.0使用辅助函数需要进行二次封装
export default defineComponent({
  name: "vuex",
  setup() {
    const store = useStore();
    const stateA = computed(() => store.state.A);
    // store.commit('aaa')
    // store.dispatch('aaa1')
    console.log("store stateA", stateA.value.aaa);
    
    return {};
  },
});
</script>
