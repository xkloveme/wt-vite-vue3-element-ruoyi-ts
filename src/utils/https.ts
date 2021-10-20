import { useStore } from '@/store'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig, { NetworkErrorCode } from '@/config/default/net.config'
import { ElMessageBox, ElMessage } from 'element-plus'
import { UserActionTypes } from '@/store/modules/user/action-types'
// import { useRoute, useRouter } from 'vue-router'
const baseURL =
   import.meta.env.NODE_ENV === 'development'
     ? '//' + window.location.host + networkConfig.host
     : networkConfig.host
const https = (hasToken = true) => {
  const config: HttpClientConfig = {
    baseURL,
    headers: {
      Authorization: hasToken ? useStore().state.user.token : ''
    },
    log: true,
    checkQuickClick: true,
    clickInterval: 1000,
    defaultParams: {},
    timeout: networkConfig.timeout
  }

  // return new HttpClient(config)

  const https = new HttpClient(config)

  // Add a request interceptor
  if (import.meta.env.NODE_ENV === 'prerelease') {
    https.httpClient.interceptors.request.use(
      (config: any) => {
        // console.log('Do something before request is sent', config)
        // Do something before request is sent
        return config
      },
      (error: any) => {
        // Do something with request error
        return Promise.reject(error)
      }
    )
  } else {
    // Add a response interceptor
    https.httpClient.interceptors.response.use(
      (response: any) => {
        // return response
        // console.log('Do something with response data', response)
        // 未设置状态码则默认成功状态
        const code = response.data.code || 200
        // 获取错误信息
        const msg =
          NetworkErrorCode[code] ||
          response.data.msg ||
          NetworkErrorCode.default
        if (code === 401) {
          ElMessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(async () => {
            // const route = useRoute()
            // const router = useRouter()
            // router.push(`/login?redirect=${route.fullPath}`).catch(err => {
            //   console.warn(err)
            // })
            await useStore().dispatch(
              UserActionTypes.ACTION_LOGIN_OUT,
              undefined
            )
            window.location.href = import.meta.env.VUE_APP_BASE_API || ''
          })
        } else if (code !== 200) {
          ElMessage({
            message: msg,
            type: 'error'
          })
          return Promise.reject(new Error(msg))
        } else {
          return response
        }
      },
      (error: any) => {
        console.log('Do something with response error', error)
        // Do something with response error
        // return Promise.reject(error)
        let { message } = error
        if (message === 'Network Error') {
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        ElMessage({
          message: message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    )
  }
  return https
}

export default https
