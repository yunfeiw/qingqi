import './public-path';
import { createApp } from 'vue'
import App from './App.vue'
import { Router } from './router'



let router = null;
let instance = null;
function render(props = {}) {
    const { container } = props;
    router = Router

    const app = createApp(App)
    app.use(router)
    app.mount(container ? container.querySelector('#app') : '#app')


}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
    console.log('[vue] props from main framework', props);
    render(props);
}
export async function unmount() {
    // instance.$destroy();  // vue3 替换成 unmounted
    instance.unmount();
    instance.$el.innerHTML = '';
    instance = null;
    router = null;
}



