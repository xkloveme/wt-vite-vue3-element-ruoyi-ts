/*
 * @Description: 用户管理相关路由管理
 * @Autor: xkloveme
 * @Date: 2020-12-10 16:12:54
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-10-15 17:04:01
 */
import { RouteRecordRaw } from 'vue-router'

const UserManagerRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "userManager" */'@/views/user-manager/login/Index.vue')
  }
]
export default UserManagerRouter
