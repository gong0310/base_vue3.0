export type RouterItem = {
  name: string;
  path: string;
  component: string;
};
// 动态路由
const asyncRouter = [
  {
    path: "/demo1",
    name: "demo1",
    component: "Home",
  },
  {
    path: "/demo2",
    name: "demo2",
    component: "Home",
  },
];
export const getRouters = (): Promise<RouterItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(asyncRouter);
    }, 300);
  });
};
