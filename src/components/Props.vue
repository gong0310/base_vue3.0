<template>
  <div>
    <hr />
    <h3>组件传参props</h3>
    <h4>父组件</h4>
    <PropsChirden
      color="attr里面获取"
      :count="count"
      @handleAddCount="handleAddCount"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import PropsChirden from "./PropsChirden.vue";

export default defineComponent({
  name: "Props",
  components: {
    PropsChirden,
  },
  setup() {


    const count = ref(0);
    provide("msg", "我是provide传递"+count.value);

    const handleAddCount = (data: number) => {
      count.value += data;
    };
    return {
      count,
      handleAddCount,
    };
  },
});
</script>
