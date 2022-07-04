/*
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-04 11:45:57
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/{{ROUTER_NAME}}/' : '/',
  mode: 'history',
  routes,
});

export default router