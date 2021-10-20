/*
 * @Description:
 * @Autor: xkloveme
 * @Date: 2020-12-08 09:45:25
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-26 12:27:00
 */

import { ContentType, Device } from '@/constant/headers'
import { InfoShowType } from '@/constant/network'
import settings from './setting.config'
interface Headers{
    token: string
    contentType: string
    version: string
    device: Device
}

const _header: Headers = {
  token: '',
  contentType: ContentType.JSON,
  version: settings.version ?? '1.0',
  device: Device.PC
}

export interface NetworkConfig{
    host?: string
    timeout?: number
    loading?: false
    errorShowType?: InfoShowType
    header?: {}
}

const networkConfig: NetworkConfig = {
  host: import.meta.env.VUE_APP_BASE_PATH || '',
  timeout: 10000,
  loading: false,
  errorShowType: InfoShowType.LOG,
  header: _header
}

export default networkConfig

export const NetworkErrorCode = {
  401: '认证失败，无法访问系统资源',
  403: '当前操作没有权限',
  404: '访问资源不存在',
  default: '系统未知错误，请反馈给管理员'
}
