<template>
  <div>
    <div v-for="item in list" :key="item.id">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ item.name }}</span>
            <span>{{ item.price }}</span>
            <span>{{ item.date }}</span>
          </div>
        </template>
        <div class="card-header">
          <span>{{ item.book.title }}</span>
          <span>{{ item.book.author }}</span>
          <span>{{ item.book.publisher }}</span>
        </div>
      </el-card>
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

<style lang="scss" scoped>
.box-card {
  margin: 1em 0;
}

.card-header {
  span {
    margin: 0 1em;
  }
}
</style>