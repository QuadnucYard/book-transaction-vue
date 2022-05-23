<template>
  <main>
    <div class="card">
      <el-form style="padding: 2em" :model="searchForm">
        <el-row>
          <el-col :span="2"><label>查找商品</label></el-col>
          <el-col :span="19">
            <el-input
              type="text"
              auto-complete="off"
              placeholder="请输入书相关信息"
              style="width: 100%"
              v-model="searchForm.keywords"></el-input
          ></el-col>
          <el-col :span="1"> <el-button type="primary" @click="searchBook">搜索</el-button></el-col>
        </el-row>
      </el-form>
    </div>
    <div class="card" style="padding: 1.3em">
      <div>
        <div class="item-card" v-for="item in list" :key="item.id">
          <el-card class="box-card" @click="toBookView(item)">
            <template #header>
              <div class="card-header">
                <span>{{ item.id }}</span>
                <span>{{ item.name }}</span>
                <span>￥{{ item.price }}</span>
                <span>发布者：{{ item.seller.username }}</span>
                <span>{{ formatDate(item.date) }}</span>
                <el-button style="float: right" @click="toBookView(item)">查看</el-button>
              </div>
            </template>
            <div class="card-header">
              <span>书名：{{ item.book.title }}</span>
              <span>作者：{{ item.book.author }}</span>
              <span>出版社：{{ item.book.publisher }}</span>
              <span>出版日期：{{ formatDate2(item.book.date) }}</span>
            </div>
            <div class="card-header">
              <p>简介：</p>
              {{ item.desc }}
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import { ElMessage } from "element-plus";
import moment from "moment";

export default {
  setup() {},
  data() {
    return {
      searchForm: {
        keywords: "",
        status: 1,
      },
      list: [],
    };
  },
  mounted() {
    // 这里要请求一下数据，代替data里的
    this.searchBook();
  },
  methods: {
    searchBook() {
      console.log("search book", this.axios);
      this.$http
        .get("/goods/list", { params: this.searchForm })
        .then(res => {
          console.log(res);
          this.list = res.data.result;
        })
        .catch(err => {
          ElMessage.error({ message: "网络异常" });
        })
        .then(() => {
          console.log("finally", arguments);
        });
    },
    toBookView(item) {
      this.$router.push({
        name: "bookview",
        params: { bookid: item.id },
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
    max-width: 1000px;
  }
}

.card {
  display: block;
  margin: 1.3em auto 1.3em auto;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  box-sizing: border-box;
}

.table {
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
  min-width: 100%;
}

.row-wrap {
  display: table-row-group;
}

.row {
  display: table-row;

  > span {
    padding: 0.5em 0;
    vertical-align: middle;
    display: table-cell;
  }
  > span:not(:last-child) {
    padding-right: 6px;
  }
}

.box-card {
  margin: 1em 0;
  cursor: pointer;
}

.card-header {
  span {
    margin: 0 1em;
  }
}
</style>