import { createApp } from 'vue'
import elementPlus from './elementPlus'


// global css
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import { store } from './store'

import './permission' // permission control
const app = createApp(App)
app.use(elementPlus)

app.use(router).use(store).mount('#app')
export default app
