import { createApp } from 'vue'
import App from './App.vue'


import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
    {
        name: 'vue1',
        entry: '//localhost:9000',
        container: '#container',
        activeRule: '/vue1',
    },
    {
        name: 'react1',
        entry: '//localhost:9001',
        container: '#container',
        activeRule: '/react1',
    },
]);
// 启动 qiankun
start();


createApp(App).mount('#app')
