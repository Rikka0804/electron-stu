

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import router from './router'
//状态管理
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)

//icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import "@assets/css/style.scss"
import 'element-plus/theme-chalk/index.css'

app.use(store).use(router).mount('#app')
