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
    path: '/assignment',
    name: 'Assignment',
    component: () => import(/* webpackChunkName: "assigment" */ '../views/Assigment.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/fe-test',
    name: 'FrontendTest',
    component: () => import(/* webpackChunkName: "fe-test" */ '../views/FrontendTest.vue')
  },
  {
    path: '/openings',
    name: 'Openings',
    component: () => import(/* webpackChunkName: "openings" */ '../views/Openings.vue')
  },
  {
    path: '/openings/:id',
    name: 'OpeningDetail',
    component: () => import(/* webpackChunkName: "opening-detail" */ '../views/OpeningDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
