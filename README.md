### 子应用模板 — **Ty-template**

### Install `node_modules`:

```bash
npm install  | pnpm install
```

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### 目录结构简要介绍

> 这里主要介绍下`src下面对应模块`目录，快速找到路由对应的模块

```
- src
    components 公共组件

    hooks  公共hook函数

    pages  业务page

    routers  路由配置

    styles 公共样式文件

    tyContext  听云函数

        - index  入口文件

    utils  公共工具、变量

        - index  通用函数

        - constants 通用常量

    App

    index.tsx 应用入口文件

     ...           // 待补充
-
```


- 说明：package.json 的必填项

```
{
  "name": "template",
  "version": "v0.0.1",
  "tingyun": {
    "cnName": "模板1",
    "enName": "template1"
  },
  "ty_config": {
    "apiRoot": "/o11y-api"
  },
  "homepage": "/template",
  "description": "this is template1",
}

```

| 字 段       | 说 明                                                           | 类型   | 是否必须 | 初始值 |
| ----------- | --------------------------------------------------------------- | ------ | -------- | ------ |
| name        | 1、静态资源 publicPath 2、路由的 basename 3、上传后的子应用名称 | string | true     | -      |
| version     | 上传应用后的指定版本                                            | string | true     | -      |
| tingyun     | 上传后生成的中英文名称                                          | string | true     | -      |
| ty_config   | 用于听云函数的 配置信息                                         | string | true     | -      |
| description | 上传后应用的秒数                                                | string | true     | -      |

---
