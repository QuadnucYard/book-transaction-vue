<template>
  <main>
    <div class="card">
      <div>这是左边的图</div>
      <div>这是右边的选项 <el-button>购买</el-button></div>
    </div>
    <div class="card">
      <div>详细信息</div>
      <div v-if="book">
        <p v-if="book.title">{{ book.title }}</p>
        <p v-if="book.author">{{ book.author }}</p>
        <p v-if="book.publisher">{{ book.publisher }}</p>
        <p v-if="book.pubdate">{{ book.pubdate }}</p>
      </div>
    </div>
    <div class="card">
      <div>卖家介绍</div>
      <div>
        <p>就是介绍</p>
      </div>
    </div>
  </main>
</template>

<script>
import { queryBook } from "../../api/localservice";

export default {
  setup() {},
  data() {
    return {
      book: null,
    };
  },
  mounted() {
    this.$data.book = queryBook(this.$route.params.bookid);
  },
  methods: {
    purchase() {
      // 目前没考虑购物车的设定
      this.$router.push({
        name: "bookorder",
        params: {
          bookid: this.$data.book.id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
</style>