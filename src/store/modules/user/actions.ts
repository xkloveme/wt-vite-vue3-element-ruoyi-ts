/*
 * @Description: app actions
 * @Autor: xkloveme
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: xkloveme
 * @LastEditTime: 2021-10-20 10:22:31
 */
import { ActionTree, ActionContext } from 'vuex'
import { RootState, useStore } from '@/store'
import { state, UserState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes } from './mutation-types'
import { UserActionTypes } from './action-types'
import { loginRequest, userInfoRequest } from '@/apis/system/user'
import { removeToken, setToken } from '@/utils/cookies'
import { PermissionActionType } from '../permission/action-types'
import router, { resetRouter } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { ElMessage } from 'element-plus'
const OK = 200
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    params: {
      // userInfo: { username: string, password: string }
      userInfo: { code: string }
      callback: Function
    }
  ): void
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_GET_USER_INFO]({
    commit
  }: AugmentedActionContext): void
  [UserActionTypes.ACTION_CHANGE_ROLES](
    { commit }: AugmentedActionContext,
    role: string
  ): void
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    // params: { userInfo: { username: string, password: string }, callback: Function}
    params: { userInfo: { code: string }, callback: Function }
  ) {
    try {
      const res = await loginRequest(params.userInfo)
      if (res?.code === OK && res.token) {
        setToken(res.token)
        commit(UserMutationTypes.SET_TOKEN, res.token)
      } else {
        ElMessage.error(res?.msg)
        params.callback()
      }
    } catch (error) {
      console.error(error)
    }
  },

  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
  },

  async [UserActionTypes.ACTION_GET_USER_INFO]({
    commit
  }: AugmentedActionContext) {
    if (state.token === '') {
      throw Error('token is undefined!')
    }
    await userInfoRequest().then(res => {
      if (res?.code === OK) {
        commit(UserMutationTypes.SET_ROLES, res.roles)
        commit(UserMutationTypes.SET_NAME, res.user.userName)
        commit(UserMutationTypes.SET_AVATAR, res.user.avatar)
        commit(UserMutationTypes.SET_EMAIL, res.user.email)
        commit(UserMutationTypes.SET_PERMISSION, res.permissions)
        return res
      } else {
        throw Error('Verification failed, please Login again.')
      }
    })
  },

  async [UserActionTypes.ACTION_CHANGE_ROLES](
    { commit }: AugmentedActionContext,
    role: string
  ) {
    const token = role + '-token'
    const store = useStore()
    commit(UserMutationTypes.SET_TOKEN, token)
    setToken(token)
    await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
    store.dispatch(PermissionActionType.ACTION_SET_ROUTES, undefined)
    store.state.permission.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  },

  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext) {
    console.log('out')
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
    resetRouter()
  }
}
