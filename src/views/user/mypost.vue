<template>
  <div>
    <div v-for="item in list" :key="item.id">
      <span>{{ item.name }}</span>
      <span>{{ item.price }}</span>
      <span>{{ item.date }}</span
      ><span>{{ item.book }}</span>
    </div>
  </div>
</template>

<script>
import { getGoodsByUser } from "@/service/goods.js";

export default {
  data() {
    return {
      list: [],
    };
  },
  async mounted() {
    const {
      data: { result: list },
    } = await getGoodsByUser(this.$store.state.user.uid);
    this.list = list;
  },
};
</script>