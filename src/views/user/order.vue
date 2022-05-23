<template>
  <div>
    <div class="order-box">
      <el-radio-group v-model="status" @change="onChangeTab" style="margin-bottom: 30px">
        <el-radio-button :label="-1">全　部</el-radio-button>
        <el-radio-button :label="0">待付款</el-radio-button>
        <el-radio-button :label="1">待发货</el-radio-button>
        <el-radio-button :label="2">已发货</el-radio-button>
        <el-radio-button :label="3">交易完成</el-radio-button>
      </el-radio-group>

      <div class="order-list-refresh">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="order-item-box"
          @click="goTo(item.id)">
          <div class="order-item-header">
            <!-- <span>{{ item.orderStatusString }}</span> -->
          </div>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <div>订单时间：{{ item.createTime }}</div>

                <!-- <el-button class="button" text>Operation button</el-button> -->
              </div>
              <div>价格：￥{{ item.price }}</div>
              <div>地址：{{ item.address }}</div>
            </template>
            <div v-for="one in item.details" :key="one.id" class="text item">
              <span>{{ one.goods.name }}：￥{{ one.price }}</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from "@/service/order.js";

export default {
  data() {
    return {
      status: -1,
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const res = await getOrderList({ pageNumber: this.page, status: this.status });
      this.list = res.data.result;
      this.loading = false;
    },
    onChangeTab() {
      this.loadData();
    },
    goTo(id) {
      //this.$router.push({ path: `order-detail?id=${id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin: 1em 0;
}
</style>
