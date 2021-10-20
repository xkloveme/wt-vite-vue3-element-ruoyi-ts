/*
 * @Description:
 * @Autor: xkloveme
 * @Date: 2021-02-03 15:06:18
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-02-04 09:29:18
 */
export interface SmsModel {
  img: string
  uuid: string
  yzm?: string
}

export interface ListTypeFace<T> {
  total: any
  rows: T
}

export interface ConfigForm {
  remark: string
  configType: string
  configValue: string
  configKey: string
  configName: string
}

export interface ConfigModel {
  code: number
  total: number
  rows: []
}
