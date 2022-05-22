<template>
  <div>
    <div v-for="item in list" :key="item.id">
      <span>{{ item.title }}</span>
      <span>{{ item.author }}</span>
      <span>{{ item.publisher }}</span>
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