<template>
  <div>
    <hr />
    <!-- 协调整个应用程序的加载状态 
    等待异步组件时渲染一些额外内容，提升用户体验-->
    <Suspense>
      <template v-slot:default>
        <SuspensChild />
      </template>
      <template v-slot:fallback>
        <!-- 组件加载完前显示-->
        <h1>LOADING...</h1>
      </template>
    </Suspense>
    <teleport to="body">
      <!-- teleport 直接父级为body -->
      <div>
        <div>I'm a teleported modal!</div>
      </div>
    </teleport>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
// 异步组件
const SuspensChild = defineAsyncComponent(() => import("./SuspensChild.vue"));
export default defineComponent({
  name: "Components",
  components: {
    SuspensChild,
  },
  setup() {
    return {};
  },
});
</script>
