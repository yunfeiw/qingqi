/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-29 15:19:55
 */
import Vue from "vue";
import './view-design'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerMicroApps, start } from 'qiankun';

Vue.config.productionTip = false;

registerMicroApps([
  {
    name: 'vue2', // app name registered
    entry: '//172.18.9.116:9000',
    container: '#micro_container',
    activeRule: '/vue2',
  },
  {
    name: 'vue3',
    entry: '//172.18.9.116:9001',
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
