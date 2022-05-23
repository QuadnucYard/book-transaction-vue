<template>
  <main>
    <div v-if="!notfound">
      <div class="card" v-if="goods">
        <div style="line-height: 2em">
          <div>{{ goods.name }}</div>
          <div>￥{{ goods.price }}</div>
          <div>发布者：{{ goods.seller.username }}</div>
          <div>{{ formatDate(goods.date) }}</div>
        </div>
        <div style="margin-top: 2em">详细信息</div>
        <div v-if="goods?.book">
          <p v-if="goods.book.title">标题：{{ goods.book.title }}</p>
          <p v-if="goods.book.author">作者：{{ goods.book.author }}</p>
          <p v-if="goods.book.publisher">出版社：{{ goods.book.publisher }}</p>
          <p v-if="goods.book.date">日期：{{ formatDate2(goods.book.date) }}</p>
        </div>
        <el-button @click="purchase">加入购物车</el-button>
      </div>
    </div>
    <div v-else><h1>Not Found!</h1></div>
  </main>
</template>

<script>
import { getDetail } from "@/service/goods.js";
import moment from "moment";

export default {
  setup() {},
  data() {
    return {
      goods: null,
      notfound: false,
    };
  },
  async mounted() {
    console.log("mounted");
    if (this.$route.params.bookid > 0) {
      const {
        data: { result: goods },
      } = await getDetail(this.$route.params.bookid);
      if (goods) {
        console.log(goods);
        this.goods = goods;
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
          gid: this.goods.id,
        })
        .then(res => {
          if (res.data.code == 200) {
            self.$message("成功加入购物车");
          }
        });
    },
    formatDate(date) {
      return date == null ? "" : moment(date).format("YYYY/MM/DD");
    },
    formatDate2(date) {
      return date == null ? "" : moment(date).format("YYYY/MM");
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  > div {
    max-width: 800px;
    margin: auto;
  }
}

.card {
  display: block;
  margin: 1.3em auto 1.3em auto;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  box-sizing: border-box;
  padding: 1em;
}
</style>