<template>
  <div>
    <div v-for="item in list" :key="item.id" class="list-item">
      <el-card>
        <span>{{ item.title }}</span>
        <span>{{ item.author }}</span>
        <span>{{ item.publisher }}</span></el-card
      >
    </div>
  </div>
</template>

<script>
import { getOrderedBooks } from "@/service/order.js";

export default {
  data() {
    return {
      list: [],
    };
  },
  async mounted() {
    const {
      data: { result: list },
    } = await getOrderedBooks(this.$store.state.user.uid);
    this.list = list;
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  margin: 0.5em 0;
  // border: 1px solid rgb(140, 140, 170);
  // padding: 0.4em;
  span {
    margin: 0em 1em;
  }
}
</style>