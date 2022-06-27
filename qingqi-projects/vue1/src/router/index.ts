import { createRouter, createWebHistory } from 'vue-router'



// 引入组件
import Home from '@pages/Home.vue';
import About from '@pages/About.vue';

// 定义路由
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
]
// 创建路由实例，并传递`routes`配置

export const Router = createRouter(
    {
        history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue1/' : '/'),
        routes
    }
)
