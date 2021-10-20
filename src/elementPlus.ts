/*
 * @Author: xkloveme
 * @Date: 2021-10-20 14:24:55
 * @LastEditTime: 2021-10-20 15:01:15
 * @LastEditors: xkloveme
 * @Description: element-plus
 * @FilePath: /vue3-element-admin-ts/src/elementPlus.ts
 * @Copyright © xkloveme
 */
import { App } from 'vue'
import i18n from '@/locales';
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
const install = (app: App) => {
  app.use(i18n)
  console.log(i18n,i18n.global.locale)
  app.use(ElementPlus, {
    //@ts-ignore
    locale: i18n.global.messages[i18n.global.locale],
  })
}
export default install