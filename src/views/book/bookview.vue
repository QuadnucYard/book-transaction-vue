<template>
  <main>
    <div v-if="!notfound">
      <div class="card">
        <div>这是左边的图</div>
        <div>这是右边的选项 <el-button @click="purchase">购买</el-button></div>
      </div>
      <div class="card">
        <div>详细信息</div>
        <div v-if="book">
          <p v-if="book.title">{{ book.title }}</p>
          <p v-if="book.author">{{ book.author }}</p>
          <p v-if="book.publisher">{{ book.publisher }}</p>
          <p v-if="book.date">{{ book.date }}</p>
        </div>
      </div>
      <!-- <div class="card">
      <div>卖家介绍</div>
      <div>
        <p>就是介绍</p>
      </div>
    </div> -->
    </div>
    <div v-else><h1>Not Found!</h1></div>
  </main>
</template>

<script>
import { getDetail } from "@/service/goods.js";

export default {
  setup() {},
  data() {
    return {
      book: null,
      notfound: false,
    };
  },
  async mounted() {
    console.log("mounted");
    if (this.$route.params.bookid > 0) {
      const {
        data: { result: book },
      } = await getDetail(this.$route.params.bookid);
      if (book) {
        console.log(book);
        this.$data.book = book;
        return;
      }
    }
    this.notfound = true;
  },
  methods: {
    purchase() {
      // 加入购物车
      const self = this;
      this.$http
        .post("/cart/add", {
          uid: this.$store.state.user.uid,
          gid: this.$data.book.id,
        })
        .then(res => {
          if (res.data.code == 200) {
            self.$message("成功加入购物车");
          }
        });
    },
  },
};
</script>

<style lang="scss">
</style>