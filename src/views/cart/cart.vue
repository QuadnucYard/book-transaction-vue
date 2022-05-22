<template>
  <div style="width: 800px; margin: auto; padding: 2em 0; line-height: 2em">
    <div>
      <template v-for="item in list" :key="item.id">
        <el-card style="margin: 1em">
          <div style="font-weight: bolder">
            <span>{{ item.name }}</span>
            <span style="float: right; margin: 0 1em">{{ formatDate(item.date) }}</span>
            <span style="float: right">￥{{ item.price }}</span>
          </div>
          <div style="padding: 1em">
            <div class="tag">{{ item.book.title }}</div>
            <div class="tag">{{ item.book.author }}</div>
            <div class="tag">{{ item.book.publisher }}</div>
          </div>
        </el-card>
      </template>
    </div>
    <div class="bottom-box">
      <el-card>
        <el-button type="primary">结算</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
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
    formatDate(date) {
      return date == null ? "" : moment(date).format("YYYY/MM/DD");
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

.tag {
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 2px;
  background-color: powderblue;
}
</style>