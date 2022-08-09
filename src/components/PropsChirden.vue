<template>
  <div>
    <hr />
    <h4>子组件</h4>
    props： {{ count }}
    <button @click="handleAddCount">emits</button>
    {{ msg }}
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs, toRef, ref } from "vue";

export default defineComponent({
  name: "PropsChirden",
  props: {
    // 声明props
    count: {
      type: Number,
    },
  },
  // emits: ["handleAddCount"], // 声明自定义事件，或者使用一个根元素
  setup(props, { attrs, emit, expose }) {
    console.log("PropsChirden", props);

    console.log("attrs ===> color", attrs);
    const msg = inject("msg");

    const handleAddCount = () => {
      emit("handleAddCount", 2);
    };

    // 注意:解构了 props 对象，解构出的变量将会丢失响应性

    // 将 `props` 转为一个其中全是 ref 的对象，然后解构
    // const { count } = toRefs(props);

    // count` 是一个追踪着 `props.count` 的 ref
    // console.log(count.value);

    //  或者，将 `props` 的单个 property 转为一个 ref
    // const count = toRef(props, "count");

    //----------------------------------------
    // 让组件实例处于 “关闭状态”
    // 即不向父组件暴露任何东西
    // expose();

    const publicCount = ref(0);
    const privateCount = ref(0);
    // 有选择地暴露局部状态
    expose({ count: publicCount });

    return {
      handleAddCount,
      msg,
    };
  },
});
</script>
