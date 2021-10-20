/*
 * @Description: 全局loading
 * @Autor: xkloveme
 * @Date: 2021-01-20 15:02:11
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-10-15 16:28:34
 */

import { ElLoading } from 'element-plus'

export default function() {
  const loading = (title: string) => {
    const loadingInstance = ElLoading.service({ text: title })
    return loadingInstance
  }

  return {
    loading
  }
}
