

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import router from './router'
//状态管理
import pinia from '@store'


//icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

app.use(ElementPlus, {
  locale: zhCn,
})

import 'element-plus/theme-chalk/index.css'

app.use(pinia).use(router).mount('#app')
