/*
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-01-25 11:22:42
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-01-25 11:23:53
 */

/*
 * @Description: pdf打印
 * @Author: scy
 * @Date: 2021-01-21 20:13:03
 * @LastEditors: scy
 * @LastEditTime: 2021-01-21 21:24:27
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const ZipeRouter: Array<RouteRecordRaw> = [
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    meta: {
      title: 'zip',
      icon: '#iconzip',
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'download',
        component: () => import(/* webpackChunkName: "zip" */ '@/views/zip/Index.vue'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  }
]
export default ZipeRouter
