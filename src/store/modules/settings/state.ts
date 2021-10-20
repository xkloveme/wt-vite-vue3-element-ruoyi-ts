/*
 * @Description: app state
 * @Autor: xkloveme
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-10-20 10:13:13
 */

import elementVariables from '@/styles/element-variables.scss'
import layoutSettings from '@/config/default/layout'
export interface SettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

export const state: SettingsState = {
  theme: elementVariables.$theme,
  fixedHeader: layoutSettings.fixedHeader,
  showSettings: layoutSettings.showSettings,
  showTagsView: layoutSettings.showTagsView,
  showSidebarLogo: layoutSettings.showSidebarLogo,
  sidebarTextTheme: layoutSettings.sidebarTextTheme
}
