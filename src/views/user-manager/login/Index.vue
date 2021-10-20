<!--
 * @Description: 登录页面
-->

<template>
  <div class="login-container">
    <video
      poster="../../../assets/images/login/video-cover.jpeg"
      loop
      autoplay
      muted
    >
      <source src="https://lajw.watone.com.cn/linanjiwei/aa/night.mp4">
    </video>

    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ t('login.title') }}
        </h3>
        <LangSelect
          :isWhite="true"
          class="set-language"
        />
      </div>

      <div v-if="tips.NODE_ENV === 'prerelease'">
        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-user" />
          </span>
          <el-input
            ref="userNameRef"
            v-model="loginForm.username"
            :placeholder="t('login.username')"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <i class="el-icon-lock" />
            </span>
            <el-input
              :key="passwordType"
              ref="passwordRef"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="t('login.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup="checkCapslock"
              @blur="capsTooltip = false"
            />
          </el-form-item>
        </el-tooltip>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            :placeholder="t('login.code')"
            style="width: 63%"
            @keydown.prevent.enter="handleLogin"
          >
            <svg-icon
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="login-code">
            <img
              :src="codeUrl"
              class="login-code-img"
              @click="getSmsCode"
            >
          </div>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item prop="code">
          <span class="svg-container">
            <i class="el-icon-lock" />
          </span>
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            :placeholder="t('login.code')"
            @keydown.prevent.enter="handleLogin"
          >
            <svg-icon
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.prevent="handleLogin"
      >
        {{ t('login.logIn') }}
      </el-button>

      <div style="position:relative">
        <div
          class="tips"
          v-if="tips.NODE_ENV === 'prerelease'"
        >
          <span>{{ t('login.username') }} : {{ tips.username }} </span>
          <span>{{ t('login.password') }} : {{ tips.password }} </span>
        </div>
        <div class="tips">
          <el-link
            type="warning"
            :href="tips.VUE_APP_BASE_API"
          >
            当前{{ tips.NODE_ENV }}环境<span v-if="tips.NODE_ENV !== 'prerelease'">，点击获取code</span>
          </el-link>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  watch,
  ref,
  nextTick,
  toRefs
} from 'vue'
import LangSelect from '@/components/lang_select/Index.vue'
import { isValidUsername } from '@/utils/validate'
import { useRoute, LocationQuery, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { useI18n } from 'vue-i18n'
import { getCodeImg } from '@/apis/system/user'
import { ElMessage } from 'element-plus'
import { getQueryVariable } from '@/utils/tools'
export default defineComponent({
  components: {
    LangSelect
  },
  setup() {
    const userNameRef = ref(null)
    const passwordRef = ref(null)
    const loginFormRef = ref(null)
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    // const { t } = useI18n()
     const { t } = useI18n({
      inheritLocale: true
    })
    const state = reactive({
      loginForm: {
        username: import.meta.env.VUE_APP_USERNAME || '',
        password: import.meta.env.VUE_APP_PASSWORD || '',
        code: getQueryVariable('code'),
        uuid: ''
      },
      codeUrl: '',
      loginRules: {
        username: [{ validator: userNameRef, trigger: 'blur' }],
        password: [{ validator: passwordRef, trigger: 'blur' }],
        code: [{ required: true, trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      capsTooltip: true,
      redirect: '',
      otherQuery: {}
    })

    const tips = reactive({
      username: state.loginForm.username,
      password: state.loginForm.password,
      NODE_ENV: import.meta.env.NODE_ENV,
      VUE_APP_BASE_API: import.meta.env.VUE_APP_BASE_API
    })

    const getSmsCode = async () => {
      const result = await getCodeImg()
      state.codeUrl = 'data:image/gif;base64,' + result?.img
      state.loginForm.uuid = String(result?.uuid)
      if (import.meta.env.NODE_ENV !== 'production') {
        state.loginForm.code = String(result?.yzm || '')
      }
    }

    const methods = reactive({
      validateUsername: (rule: any, value: string, callback: Function) => {
        if (!isValidUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      },
      validatePassword: (rule: any, value: string, callback: Function) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      },
      checkCapslock: (e: KeyboardEvent) => {
        const { key } = e
        state.capsTooltip =
          key !== null && key.length === 1 && key >= 'A' && key <= 'Z'
      },
      showPwd: () => {
        if (state.passwordType === 'password') {
          state.passwordType = ''
        } else {
          state.passwordType = 'password'
        }
        nextTick(() => {
          ;(passwordRef.value as any).focus()
        })
      },
      handleLogin: () => {
        ;(loginFormRef.value as any).validate(async (valid: boolean) => {
          if (valid) {
            state.loading = true
            const params = {
              userInfo: state.loginForm,
              callback: () => {
                if (tips.NODE_ENV === 'prerelease') {
                  getSmsCode()
                } else {
                  ElMessage.success('登录成功')
                }
              }
            }
            await store.dispatch(UserActionTypes.ACTION_LOGIN, params)
            router
              .push({
                path: state.redirect || '/',
                query: state.otherQuery
              })
              .catch((err) => {
                console.warn(err)
              })
            // Just to simulate the time of the request
            setTimeout(() => {
              state.loading = false
            }, 0.5 * 1000)
          } else {
            return false
          }
        })
      }
    })

    function getOtherQuery(query: LocationQuery) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {} as LocationQuery)
    }

    watch(
      () => route.query,
      (query) => {
        if (query) {
          state.redirect = query.redirect?.toString() ?? ''
          state.otherQuery = getOtherQuery(query)
        }
      }
    )

    onMounted(() => {
      if (tips.NODE_ENV === 'prerelease') {
        getSmsCode()
        if (state.loginForm.username === '') {
          ;(userNameRef.value as any).focus()
        } else if (state.loginForm.password === '') {
          ;(passwordRef.value as any).focus()
        }
      }
    })

    return {
      userNameRef,
      passwordRef,
      loginFormRef,
      getSmsCode,
      tips,
      ...toRefs(state),
      ...toRefs(methods),
      t
    }
  }
})
</script>

<style lang="scss">
.login-code {
  float: right;
  height: 47px;
  margin-left: -100px;
  img {
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
  }
}
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  overflow: hidden;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background-color: $loginBg;
  video {
    position: absolute;
    /* Vertical and Horizontal center*/
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 160px 35px 0;
    padding: 200px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
