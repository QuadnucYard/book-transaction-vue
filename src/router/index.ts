import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import index from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      keepalive: false
    }
  },
  {
    path: '/auth/login',
    name: 'login',
    component: login,
    meta: {
      keepalive: false
    }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: register,
    meta: {
      keepalive: false
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
