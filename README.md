# wt-vite-vue3-element-ruoyi-ts



> 🎉 全网首发🎉 基于 Vite 2.0 + Vue 3.0 + Vue-Router 4.0 + Vuex 4.0 + element-plus + typescript 的后台管理系统



## Project setup
```
npm i -g pnpm
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm  serve:dev
```

### Compiles and minifies for production
```
pnpm build:prod
```
## 接口调用

1.方案1(推荐)
``` js
import $api from './apis'
$api.XXX
```
1.方案2(不推荐):目前并没有挂载

``` js
const $api = internalInstance?.appContext.config.globalProperties.$api
 $api.XXX
```