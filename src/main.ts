import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"

// import "~/styles/element/index.scss";

import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

//import "~/styles/index.scss";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"

import axios from 'axios'
import VueAxios from 'vue-axios'
import { Router, RouteRecordRaw } from "vue-router";

axios.defaults.baseURL = 'http://10.208.188.228:8081/api';
//axios.defaults.baseURL = 'http://localhost:8081/api';
axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  console.log("beforeEach", to.meta.requireAuth);
  if (store.state.user && to.path.startsWith('/admin')) {
    initAdminMenu(router, store)
  }
  if (to.meta.requireAuth) {
    if (store.state.user) {
      axios.get('/auth').then(resp => {
        if (resp) {
          next();
        }
      });
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});


// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error) {
      store.commit('logout');
      router.replace('/auth/login');
    }
    // 返回接口返回的错误信息
    return Promise.reject(error);
  })

const initAdminMenu = (router: Router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    return;
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data.result);
      //router.addRoutes(fmtRoutes);
      fmtRoutes.forEach(r => router.addRoute(r));
      store.commit('initAdminMenu', fmtRoutes);
    }
  });
}

const formatRoutes = (routes) => {
  let fmtRoutes = [];
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children);
    }

    let fmtRoute = {
      path: route.path,
      component: () => import(`./views/admin/${route.component}.vue`),
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    };
    fmtRoutes.push(fmtRoute);
  })
  return fmtRoutes;
}

const app = createApp(App);
app.use(router);
app.use(store)
app.use(ElementPlus);
app.use(VueAxios, axios)
app.mount("#app");
