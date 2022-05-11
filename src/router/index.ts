import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import index from '../views/index.vue'
import booklist from '../views/book/booklist.vue'
import bookview from '../views/book/bookview.vue'

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
  {
    path: '/book/list',
    name: 'booklist',
    component: booklist,
    meta: {
      keepalive: false
    }
  },
  {
    path: '/book/:bookid',
    name: 'bookview',
    component: bookview,
    meta: {
      keepalive: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
