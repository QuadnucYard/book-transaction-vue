<template>
  <main class="order-page">
    <div style="padding: 2em 0">
      <el-form ref="form" :model="form" label-position="right" label-width="5em" class="order-form">
        <h3>购物车在结算了，填写信息吧</h3>
        <el-form-item label="地址">
          <el-input v-model="form.address" type="text" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="padding: 1em 0">
      <div class="order-form">
        <div v-for="item in list" :key="item.id">
          <div class="list-item">
            <span>{{ item.name }}</span>
            <span style="margin-left: 1em">￥{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      form: {
        address: "",
      },
      list: [],
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        if (!this.$route.params || !this.$route.params.checkList) {
          this.$router.replace({ name: "cart" });
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.$route.params?.checkList) {
      this.list = JSON.parse(this.$route.params.checkList);
    }
  },
  methods: {
    submit() {
      const self = this;
      this.$http
        .post("/order/create", {
          uid: this.$store.state.user.uid,
          address: this.form.address,
          list: this.list.map(t => t.id),
        })
        .then(res => {
          if (res.data.code == 200) {
            self.$message("成功下单");
            self.$router.replace({ name: "cart" });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.order-page {
  margin: auto;
  width: 800px;

  > div {
    padding: 2em 0;
  }
}

.order-form {
  border-radius: 6px;
  padding: 2em;
  background: #ffffff;
}

.list-item {
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0.5em;
  padding: 0.3em;
}
</style>