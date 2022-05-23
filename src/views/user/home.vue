<template>
  <main>
    <div>
      <h2>欢迎！ {{ this.$store.state.user.name }}</h2>
    </div>
    <div class="header-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="主页" name="main"></el-tab-pane>
        <el-tab-pane label="我的订单" name="order"></el-tab-pane>
        <el-tab-pane label="我购买的书" name="purchase"></el-tab-pane>
        <el-tab-pane label="我发布的书" name="post"></el-tab-pane>
        <el-tab-pane label="个人设置" name="setting"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="full-container">
      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      activeName: "main",
    };
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      this.$router.push({ path: `/user/${this.$store.state.user.uid}/${tab.props.name}` });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  background: white;
  margin: 0em 10em;
  padding: 2em 2em;
}
.header-container {
}

.full-container {
  // margin: 5em;
}
</style>