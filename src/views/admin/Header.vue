<template>
  <el-card class="admin-header" @click="toIndex" title="点击回到首页">
    <span style="font-size: 24px; font-weight: bold; position: absolute" href="/index"
      >KOOB后台管理</span
    >
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px; float: right"></i>
  </el-card>
</template>

<script>
import { createDefaultRouter } from "@/router";

export default {
  name: "Header",
  methods: {
    logout() {
      var _this = this;
      this.$http
        .get("/logout")
        .then(resp => {
          if (resp && resp.data.code === 200) {
            _this.$store.commit("logout");
            _this.$router.replace("/index");
            // 清空路由，防止路由重复加载
            const newRouter = createDefaultRouter();
            _this.$router.matcher = newRouter.matcher;
          }
        })
        .catch(failResponse => {});
    },
    toIndex() {
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style scoped>
.admin-header {
  height: 80px;
  opacity: 0.8;
  line-height: 40px;
  min-width: 900px;
}
.el-icon-switch-button {
  cursor: pointer;
  outline: 0;
}
</style>
