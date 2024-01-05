import { useRoutes } from "react-router-dom";
import { routers } from "./routers/router";

function App() {
  // 返回与当前位置匹配的路由元素，参数: 创建的路由对象
  return useRoutes(routers);
}

export default App;