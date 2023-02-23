<template>
  <div>
    <hr />
    <h3>Setup语法糖</h3>
    <div>
      message<input type="text" v-model="message" /><button @click="handleLog">
        handleLog
      </button>
    </div>
    <div>obj.name<input type="text" v-model="obj.name" />{{ obj.name }}</div>
  </div>
</template>

<script lang="ts" setup>
/**
 * <script setup> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖
 * 1、代码更简洁
 * 2、能够使用纯 Typescript 声明 prop 和 emit
 * 3、无需retuen，ref 在模板中使用的时候会自动解包
 * 4、组件、自定义指令无需手动注册，直接使用，不过自定义指令必须遵循 vNameOfDirective 这样的命名规范
 * 5、顶级 await 的支持，<script setup>结果代码会被编译成 async setup()
 * 6、使用defineExpose、useAttrs、useSlots、defineProps、defineEmits接收和暴露
 */
import { ref, reactive, toRefs, useAttrs, useSlots } from "vue";
// import MyComponent from './MyComponent.vue'

const message = ref("666");
const obj = reactive({
  name: "666",
});
const handleLog = () => {
  console.log(message.value);
};
// defineProps
const props = defineProps({
  msg: {
    type: String,
    required: false,
    default: "",
  },
});
// -----------其余写法
// 使用传递字面量类型的纯类型语法做为参数，这是TS特有的
// defineProps<{ msg: string }>();
// -----------或
// type Props = {
//   msg?: string;
// };
// defineProps<Props>();
// -----------TS 特有的默认值方式
// type Props = {
//     title?: string,
//     data?: number[]
// }
// withDefaults(defineProps<Props>(), {
//     title: "张三",
//     data: () => [1, 2, 3]
// })
const { msg } = toRefs(props);
console.log(props, msg);
//defineEmits
const emit = defineEmits(["changeCount"]);
emit("changeCount", 111);
// useAttrs
const attrs = useAttrs();
console.log("=====attrs", attrs);
// useSlots
const slots = useSlots();
console.log("=====slots", slots);

/**
 * 标准组件写法里，子组件的数据都是默认隐式暴露给父组件的
 * setup语法糖里面默认关闭的，为了更安全，不让父组件直接修改到子组件
 *
 * 当父组件通过模板 ref 的方式获取到当前组件的实例，
 * 获取到的实例会像这样 { a: number, b: number } (ref 会和在普通实例中一样被自动解包)
 */
defineExpose({
  message: "hhhhh",
});

// 动态样式
const theme = {
  color: "red",
};
</script>
<style>
h3 {
  color: v-bind("theme.color");
}
</style>
