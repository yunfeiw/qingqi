import { createApp } from 'vue'
import App from './App.vue'


import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
    {
        name: 'reactApp',
        entry: '//localhost:3000',
        container: '#container',
        activeRule: '/app-react',
    },
    {
        name: 'vueApp',
        entry: '//localhost:8080',
        container: '#container',
        activeRule: '/app-vue',
    },
]);
// 启动 qiankun
start();


createApp(App).mount('#app')
