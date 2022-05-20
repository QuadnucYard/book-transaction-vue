<template>
  <div>
    <el-menu
      :default-active="'/index'"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="green"
      style="min-width: 800px; display: inline-block">
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <i
        class="el-icon-menu"
        style="float: right; font-size: 45px; color: #222; padding-top: 8px"></i>
    </el-menu>
    <div class="right">
      <el-link type="primary" :underline="false" v-show="!username">
        <router-link :to="{ name: 'register' }">注册</router-link>
      </el-link>
      <el-link type="primary" :underline="false" v-show="!username">
        <router-link :to="{ name: 'login' }">登录</router-link>
      </el-link>
      <el-link type="default" :underline="false" v-show="username" @click="toHome">{{
        username
      }}</el-link>
      <el-link type="primary" :underline="false" v-show="username" @click="logout"> 注销 </el-link>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  name: "NavMenu",
  data() {
    return {
      navList: [
        { name: "/index", navItem: "首页" },
        { name: "/book/list", navItem: "商品列表" },
        { name: "/book/post", navItem: "商品发布" },
      ],
    };
  },
  computed: {
    username() {
      return this.$store.state.user?.name;
    },
  },
  methods: {
    logout() {
      const self = this;
      this.$http.get("/auth/logout").then(res => {
        self.$store.commit("logout");
        ElMessage.success("成功注销");
      });
    },
    toHome() {
      console.log(this.$store.state.user);
      this.$router.push({
        name: "userhome",
        params: {
          uid: this.$store.state.user.uid,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.right {
  float: right;
  user-select: none;

  a {
    width: 4em;
    text-decoration: none;
  }
}

.el-menu-item {
  width: 8em;
}
</style>