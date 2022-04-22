import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Login',
		component: Login,
		meta: {
			keepalive: false
		}
	},
	{
		path: '/Main',
		name: 'Main',
		component: Main,
		meta: {
			keepalive: true
		}
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
