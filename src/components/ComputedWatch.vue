<template>
  <hr />
  <h3>Computed / Watch</h3>
  <div><input v-model="x" type="number" />x：{{ x }}</div>
  <div><input v-model="count" type="number" />count：{{ count }}</div>
  ----------------------------------------
  <div>
    count * 2 = {{ multiply }} <input type="number" v-model="multiply" />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  watchEffect,
  watchPostEffect,
  ref,
  computed,
} from "vue";

export default defineComponent({
  name: "ComputedWatch",
  setup() {
    const x = ref(0);
    const y = ref(0);

    let state = reactive({
      count: 0,
      age: "",
    });
    // watch一个数据
    // 单个 ref
    watch(
      x,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      },
      {
        immediate: true,
        deep: true,
        flush: "post", // 刷新时机:组件更新后执行。 如果想在侦听器回调中能访问被 Vue 更新之后的DOM，你需要指明 flush: 'post' 选项
        // 后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()
        /**
         * pre:组件更新前执行
         * sync:强制效果始终同步触发
         * post:组件更新后执行
         */
      }
    );
    // watchPostEffect(()=>{});
    watch(
      state,
      (newVal, oldVal) => {
        console.log('watch',newVal.count, oldVal);
      },
      {
        immediate: true,
        deep: true,
      }
    );
    // watch多个数据用数组
    // 注意： ref 直接监听/箭头函数返回
    //  reactive对象必须用箭头函数返回 ，否则不能侦听响应式对象的 property
    const stop = watch(
      [x, () => y.value, () => state.count],
      ([newX, newY, newCount]) => {
        console.log(`x is ${newX} and y is ${newY} and count is ${newCount}`);
      }
    ); // 返回一个stop函数
    //直接调用stop()，可以清除/停止监听

    // 监视所有回调中使用的数据，没有使用的不监听。默认触发一次
    watchEffect((onimvalidate) => {
      // 这里只监听count，x
      console.log("watchEffect", state.count, x.value);
      onimvalidate(()=>{
        console.log('before前置，watchEffect前执行')
      })
    });
    /**
     * watch vs. watchEffect
     * watch 只追踪明确侦听的源。我们能更加精确地控制回调函数的触发时机
     * watchEffect 自动追踪所有能访问到的响应式 property。代码往往更简洁，但其响应性依赖关系不那么明确
     */
    //----------------------------------------
    // 默认get, 返回一个只读的响应式 ref 对象
    // const multiply=computed(()=>{
    //   return state.count*2
    // })
    //
    const multiply = computed({
      get() {
        return state.count * 2;
      },
      set(value:number) {
        state.count = value / 2;
      },
    });
    console.log('multiply',multiply.value)
    return {
      x,
      multiply,
      ...toRefs(state),
    };
  },
});
</script>
