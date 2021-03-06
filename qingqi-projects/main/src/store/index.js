/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-29 15:19:55
 */
import Vue from "vue";
import Vuex from "vuex";

// 面包屑
import crumbs from './crumbs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    crumbs
  }
});
