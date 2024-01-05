// router/index.js 管理路由组件
import Welcome from "../pages/welcome/index";
import Detail from "../pages/detail/index";
import Page404 from "../pages/error/404";

export const routers = [
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];
