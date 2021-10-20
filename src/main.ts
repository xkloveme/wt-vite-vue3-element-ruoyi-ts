import { createApp } from 'vue'
import i18n from './locales'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/lib/theme-chalk/index.css'


// global css
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import { store } from './store'

import './permission' // permission control
const app = createApp(App)
app.use(i18n)
app.use(ElementPlus)
app.use(router).use(store).mount('#app')
export default app
