<template>
  <main>
    <div>欢迎！ {{ user?.username }}</div>
    <el-tabs>
      <span></span>
      <span>我购买的书</span>
      <span>我发布的书</span>
      <span></span>
      <span>设置</span>
    </el-tabs>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const self = this;
    this.$http.get("/user/" + this.$store.state.user.uid).then(res => {
      self.user = res.data.result;
      console.log(res.data);
    });
  },
};
</script>