import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import("@/views/index.vue"),
    meta: {
      keepalive: false
    },
    alias: "/index"
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import("@/views/login.vue"),
    meta: {
      keepalive: false
    }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import("@/views/register.vue"),
    meta: {
      keepalive: false
    }
  },
  {
    path: '/book/list',
    name: 'booklist',
    component: () => import("@/views/book/booklist.vue"),
    meta: {
      keepalive: false
    }
  },
  {
    path: '/book/:bookid',
    name: 'bookview',
    component: () => import("@/views/book/bookview.vue"),
    meta: {
      keepalive: false
    }
  },
  {
    path: '/book/post',
    name: 'bookpost',
    component: () => import("@/views/book/bookpost.vue"),
    meta: {
      keepalive: false,
      requireAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
