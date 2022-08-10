<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr />
    <h3 ref="dom">ref</h3>
    <p>count:{{ count }}</p>
    <input v-model="count" type="number" />
    <button @click="handleCountAdd">handleCountAdd</button>
    <h3>reactive</h3>
    <!-- <h4>不使用toRefs</h4>
    <p>state.age:{{ state.age }}</p>
    <input v-model="state.age" type="number" /> -->
    <h4>使用toRefs</h4>
    <p>age:{{ age }}</p>
    <input v-model="age" type="number" />
    <button @click="handleAgeAdd">handleCountAdd</button>
    <keep-alive>
      <LifeCycle />
    </keep-alive>
    <ComputedWatch />
    <Props />
    <Components />
    <Setup ref="setup" msg="我是defineProps接收的" msg2="我是useAttrs 接收的">
      useSlots
    </Setup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onErrorCaptured,
  nextTick,
  Ref,
} from "vue";
import LifeCycle from "./LifeCycle.vue";
import ComputedWatch from "./ComputedWatch.vue";
import Props from "./Props.vue";
import Components from "./Components.vue";
import Setup from "./Setup.vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    LifeCycle,
    ComputedWatch,
    Props,
    Components,
    Setup,
  },
  setup(props, context) {
    // 该上下文对象context是非响应式的，可以安全地解构
    // setup中的返回值是一个对象，内部的属性和方法是给html模板使用的
    console.log("props=>", props, "\ncontext=>", context);
    /**
     * context:
     *  attrs 不被props接收的就是attrs
     *  emit 用来分发自定义事件的函数
     *  expose 暴露公共 property（函数）
     *  slots 包含所有传入的插槽内容的对象，就是子组件中的提供给父组件使用的一个占位符
     */
    onErrorCaptured(() => {
      console.log("子组件报错onErrorCaptured");
    });
    //----------------------------ref
    const count: Ref<number> = ref(0); // 定义响应式数据 ref对象
    const handleCountAdd = () => {
      count.value++;
      console.log(count.value);
    };
    //----------------------------reactive
    const person = {
      name: "小明",
      age: 22,
    };
    const state = reactive(person); // 接收一个普通对象然后返回该普通对象的响应式代理器对象
    const handleAgeAdd = () => {
      // person.age++; //person.age++;这种方式页面不会更新渲染,需要操作代理对象才有用
      // state.age++; // 正常写法

      //  解构state 或者 扩展运算符都会使数据失去响应性
      // let { age } = state;
      // age++;
      // console.log(age,state.age)

      // 需配合 toRefs 将响应式对象转化为一组ref，解决
      // toRefs可以在不丢失响应式的情况下对返回的对象进行分解使用
      let { age } = toRefs(state); // 现在是ref
      age.value++;
      console.log(age.value, state.age);
      /**
       * toRefs：将一个响应式对象转换为一个普通对象，这个普通对象全是ref(对该普通对象的每个属性都做一次ref操作，这样每个属性都是响应式的)
       * 转换响应式对象中所有属性为单独响应式数据，并且转换后的值和之前是关联的。
       * 
       * 源码实现过程：
       *    1、toRefs()内部先isProxy判断是否是proxy对象，如果不是报警告，如果是对传进来的数据进行 for in循环,每一个值进行toRef()操作
       *    2、toRef()内部先isRef()判断是否已经是ref对象，如果是直接返回；如果不是就创建RefImpl实例对象
       *    3、isRef()通过判断RefImpl实例对象上的只读属性 __v_isRef 是否是true，默认创建后是true
       * 
       * toRef： 单个 property 转为一个 ref
       * 转换响应式对象中某个属性为单独响应式数据，并且转换后的值和之前是关联的（ref 函数也可以转换，但值非关联）
       */
    };
    //----------------------------ref获取dom元素
    const dom = ref(null);
    nextTick(() => {
      console.log("ref获取dom元素 dom", dom.value);
    });

    const setup = ref();
    nextTick(() => {
      console.log("ref获取dom元素 setup defineExpose=>", setup.value.message);
    });
    return {
      count,
      state, // 不使用toRefs
      ...toRefs(state), // 使用toRefs
      dom,
      setup,
      handleCountAdd,
      handleAgeAdd,
    };
    /**
     * ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
     *
     * ref源码实现过程：
     * 1、调用createRef(value,shallow)方法，createRef内部通过isRef()判断是否是ref类型，如果是直接返回，如果不是去实例化ref对象。new RefImpl()
     *    RefImpl类传两个参数，第一个是value，第二个默认false表示是否shallow浅响应式
     * 2、RefImpl类里面的constructor里面定义了 this._value = 第一个入参value，
     *    第一个入参value在赋值给this._value前经过处理的，通过isObject判断是否是引用类型，如果是使用toReactive方法将对象/数组转换为reactive的代理对象
     *    如果不是直接返回当前value
     * 3、读值：触发RefImpl类里面的get value(){}方法，return this._value，同时调用track函数进行依赖收集
     * 4、设置值：触发RefImpl类里面的set value(newVal){}方法 this._value= newVal，同时调用trigger函数进行依赖更新
     *
     * 当 ref 在template模板中作为顶层 property 被访问时，它们会被自动“解包”，所以不需要使用 .value。
     * 响应式转换是“深层”的，如果不想深层次的解包（深层次响应式），可以使用shallowRef、shallowREactive替代。他只会保留这个对象顶层次访问的响应性,不会深层递归地转为响应式
     * 如果使用shallow类型定义数据，可以配合用triggerRef 强制更新页面DOM(底层调用trigger函数进行依赖更新)，
     *
     * reactive源码实现过程：
     * 1、先调用isReadonly，如果是只读，直接返回。如果不是调createReactiveObject()
     * 2、createReactiveObject内部isObject判断是否是引用数据类型，如果不是则报警告。如果是使用Proxy进行包裹
     *
     * ref内部: 通过给value属性添加getter/setter来实现对数据的劫持 ，返回一个响应式的、可更改的 ref 对象
     * reactive内部: 通过使用Proxy对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据，返回一个被proxy包裹的对象的响应式代理。
     */
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
