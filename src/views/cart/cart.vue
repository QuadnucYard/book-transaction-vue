<template>
  <div>
    <div>
      <template v-for="item in list" :key="item.id">
        <el-card>
          <div>{{ item.name }}</div>
          <div>{{ item.price }}</div>
          <div>{{ item.date }}</div>
          <div>{{ item.book }}</div>
        </el-card>
      </template>
    </div>
    <div class="bottom-box">
      <el-card>
        <el-button type="primary">清空购物车</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getCart } from "@/service/cart.js";

export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.loadList();
  },
  methods: {
    async loadList() {
      const {
        data: { result: list },
      } = await getCart({ uid: this.$store.state.user.uid });
      this.list = list.goods;
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-box {
  position: fixed;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>