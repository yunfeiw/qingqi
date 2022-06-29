import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerMicroApps, start } from 'qiankun';

Vue.config.productionTip = false;

registerMicroApps([
  {
    name: 'vue2', // app name registered
    entry: '//localhost:7100',
    container: '#micro_container',
    activeRule: '/vue2',
  },
  {
    name: 'vue3',
    entry: '//localhost:7100',
    container: '#micro_container',
    activeRule: '/vue3',
  },
]);

start();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
