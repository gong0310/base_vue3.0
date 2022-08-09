<template>
  <hr />
  <h3>生命周期(不需要根节点，内部自带Fragment)</h3>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
} from "vue";

export default defineComponent({
  name: "LifeCycle",
  // setup包含了 beforeCreate created
  // setup在beforeCreate之前执行，此时组件对象还没有创建，this是undefined
  setup() {
    console.log("setup");
    onBeforeMount(() => {
      let div = document.querySelector("h3");
      console.log("onBeforeMount", div);
    });
    onMounted(() => {
      let div = document.querySelector("h3");
      console.log("onMounted", div);
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    onActivated(() => {
      console.log("onActivated");
    });
    onDeactivated(() => {
      console.log("onDeactivated");
    });
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
});
</script>
