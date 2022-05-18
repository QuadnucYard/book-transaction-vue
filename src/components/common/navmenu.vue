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
      <i class="el-icon-menu" style="float: right; font-size: 45px; color: #222; padding-top: 8px"></i>
    </el-menu>
    <div class="right">
      <el-link type="primary" :underline="false" v-show="loggedin">
        <router-link :to="{ name: 'register' }">注册</router-link></el-link
      >
      <el-link type="primary" :underline="false" v-show="loggedin">
        <router-link :to="{ name: 'login' }">登录</router-link></el-link
      >
    </div>
  </div>
</template>

<script>
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
    loggedin() {
      console.log(this.$store.state);
      return this.$store.state.username != null;
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