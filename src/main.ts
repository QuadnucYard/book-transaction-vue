import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"

// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

//import "~/styles/index.scss";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"

import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:8081/api';
axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  console.log("beforeEach", to.meta.requireAuth);
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

const app = createApp(App);
app.use(router);
app.use(store)
// app.use(ElementPlus);
app.use(VueAxios, axios)
app.mount("#app");
