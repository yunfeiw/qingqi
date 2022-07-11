/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-29 15:19:55
 */
import Vue from "vue";
import Vuex from "vuex";

import user from './user';
import menu from './menu';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    menu
  }
});
