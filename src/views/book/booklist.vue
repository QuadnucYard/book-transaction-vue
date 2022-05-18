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
              v-model="searchForm.keywords"
            ></el-input
          ></el-col>
          <el-col :span="1">
            <el-button type="primary" @click="searchBook"
              >搜索</el-button
            ></el-col
          >
        </el-row>
      </el-form>
    </div>
    <div class="card" style="padding: 1.3em; display: none">
      <div>
        <div class="table">
          <div class="header-wrap">
            <div class="header"></div>
          </div>
        </div>
        <div class="row-wrap">
          <div class="row" v-for="item in list" :key="item.id">
            <span style="width: 6em">{{ item.id }}</span>
            <span style="width: 100%">{{ item.name }}</span>
            <span style="width: 8em">{{ item.book.author }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="padding: 1.3em">
      <div>
        <div class="item-card" v-for="item in list" :key="item.id">
          <div>
            <div>
              <span>{{ item.id }}</span>
              <span @click="toBookView(item)">{{ item.name }}</span>
              <span>{{ item.price }}</span>
              <span>{{ item.seller.username }}</span>
              <span>{{ item.date }}</span>
            </div>
          </div>
          <div>
            <p v-if="item.book.title">{{ item.book.title }}</p>
            <p v-if="item.book.author">{{ item.book.author }}</p>
            <p v-if="item.book.publisher">{{ item.book.publisher }}</p>
            <p v-if="item.book.date">{{ item.book.date }}</p>
          </div>
          <div>
            <p>{{ item.desc }}</p>
            <!-- <img :src="item.image" /> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import { ElMessage } from "element-plus";
import { queryBookList } from "../../api/localservice.ts";

export default {
  setup() {},
  data() {
    return {
      searchForm: {
        keywords: "",
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
        .then((res) => {
          console.log(res);
          this.list = res.data.result;
        })
        .catch((err) => {
          ElMessage.error({ message: "网络异常" });
          //this.$data.list = queryBookList(this.$data.searchForm);
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
  },
};
</script>


<style lang="scss">
main {
  > div {
    max-width: 1200px;
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
</style>