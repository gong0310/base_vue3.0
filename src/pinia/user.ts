import { defineStore } from "pinia";

interface IProduct {
  name: string;
  sex: string;
}
// type CartProduvt = {
//   age: number;
// } & IProduct; 合并类型

// 合并类型，(Omit)除去IProduct里面的sex
type CartProduvt = {
  age: number;
} & Omit<IProduct, "sex">;

// 第一个参数是应用程序中 store 的唯一id，第二个option配置项
// 返回一个获取容器的函数
export const useUserStore = defineStore("users", {
  // 不需要.state.age，会自动把state，getters，actions里面的内容暴露出来，直接.age

  // 相当于组件中的 data
  /**
   * 1.必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   * 2.必须是监听函数：更好的ts类型推导
   */
  state: () => {
    return {
      name: "小猪课堂",
      age: 21,
      sex: "男",
    };
  },
  // 相当于组件中的 computed，有缓存
  getters: {
    getAddAge: (store) => {
      //   return store.age + 100;
      // 如果getters接收参数，则返回函数来获取参数
      return (num: number) => store.age + num;
    },
    getNameAndAge(): string {
      // this指向的便是当前store实例，感觉用vue2一样，如果是箭头函数,this就不是当前store实例而是undefined
      // 如果getters中使用了this，则必须手动设置返回类型，否则类型推导不出来
      return this.name + this.getAddAge(1000); // 调用其它getter
    },
  },
  // 相当于组件中的 methods
  actions: {
    // 可以是异步的，可以是同步的
    saveName(name: string) {
      // 发送请求，拿token，取token
      this.name = name;
      const aaa: CartProduvt = {
        age: 111,
        name: "111",
      };
      console.log(aaa);
    },
  },
});
