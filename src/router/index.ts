/*
 * @Author: xkloveme
 * @Date: 2021-10-13 18:07:24
 * @LastEditTime: 2021-10-15 17:41:40
 * @LastEditors: xkloveme
 * @Description:
 * @FilePath: /vue3-element-admin-ts/src/router/index.ts
 * @Copyright © xkloveme
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
const constantFiles: any = import.meta.globEager('./constantModules/**/*.ts')
let constantModules: Array<RouteRecordRaw> = []
Object.keys(constantFiles).forEach((key:any) => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles[key].default)
})

const asyncFiles: any = import.meta.globEager('./permissionModules/**/*.ts')
let permissionModules: Array<RouteRecordRaw> = []
Object.keys(asyncFiles).forEach((key:any) => {
  if (key === './index.ts') return
  permissionModules = permissionModules.concat(asyncFiles[key].default)
})

export const asyncRoutes: Array<RouteRecordRaw> = [...permissionModules]

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ '@/views/redirect/Index.vue'
          )
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'
          ),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: '#icondashboard',
          affix: true
        }
      }
    ]
  },
  ...constantModules,
  ...asyncRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

export default router