/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-18 10:23:58
 */
import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 状态管理
app.use(createPinia())
// 路由
app.use(router)
app.use(ElementPlus)
app.mount('#app')
