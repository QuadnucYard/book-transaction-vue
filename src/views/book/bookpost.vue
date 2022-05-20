<template>
  <div class="post" style="padding: 2em 2em">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="postRules"
      label-position="right"
      label-width="5em"
      class="post-form">
      <h3 class="title">发布我的二手书！</h3>
      <el-form-item prop="name" label="名称">
        <el-input v-model="postForm.name" type="text" placeholder="商品标题~" />
      </el-form-item>
      <el-form-item prop="desc" label="描述">
        <el-input v-model="postForm.desc" type="textarea" placeholder="写下你的描述~" rows="5" />
      </el-form-item>
      <el-form-item prop="price" label="价格">
        <el-input
          v-model="postForm.price"
          type="number"
          placeholder="转手价格"
          style="width: 10em" />
      </el-form-item>
      <div style="border: 2px solid #dddddd; border-radius: 5px; padding: 1em; margin: 1em">
        <h4 class="title">这是书籍信息~</h4>
        <!-- TODO 显示字段是否已存在于数据库的提示 -->
        <el-form-item prop="book.title" label="书名">
          <el-autocomplete
            v-model="postForm.book.title"
            :fetch-suggestions="querySearchTitle"
            :trigger-on-focus="false"
            clearable
            class="inline-input w-50"
            @select="handleSelectBookTitle" />
        </el-form-item>
        <el-form-item prop="book.author" label="作者">
          <el-autocomplete
            v-model="postForm.book.author"
            :fetch-suggestions="querySearchAuthor"
            :trigger-on-focus="false"
            clearable
            @select="handleSelectBookTitle" />
        </el-form-item>
        <el-form-item prop="book.publisher" label="出版社">
          <el-autocomplete
            v-model="postForm.book.publisher"
            :fetch-suggestions="querySearchPublisher"
            :trigger-on-focus="false"
            clearable
            @select="handleSelectBookTitle" />
        </el-form-item>
        <el-form-item prop="bookdate" label="出版日期">
          <el-date-picker v-model="postForm.book.date" type="month" />
        </el-form-item>
        <el-form-item prop="bookabs" label="简介">
          <el-input v-model="postForm.book.abs" type="textarea" rows="3" />
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交！</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "@/utils/request.js";
import _ from "underscore";

export default {
  setup() {},
  data() {
    return {
      postForm: {
        name: "",
        desc: "",
        book: {
          title: "",
          author: "",
          publisher: "",
          date: null,
          abs: "",
        },
        price: 0,
        images: [],
      },
      postRules: {
        name: [
          {
            required: true,
            message: "请输入商品名",
            trigger: "blur",
          },
        ],
        "book.title": [
          {
            required: true,
            message: "请输入书名",
            trigger: "blur",
          },
        ],
        "book.author": [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur",
          },
        ],
        "book.publisher": [
          {
            required: true,
            message: "请输入出版社",
            trigger: "blur",
          },
        ],
      },
      booklib: null,
    };
  },
  mounted() {
    const self = this;
    axios.get("/book/list").then(res => {
      console.log(res);
      if (res.result) self.booklib = res.result;
    });
  },
  methods: {
    onSubmit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          ElMessage.info("提交请求");
          axios({
            url: "/goods/post",
            method: "post",
            data: this.postForm,
          }).then(res => {
            console.log(res);
            ElMessage.success("成功发布");
            //this.$router.push({ name: "index" });
          });
        }
      });
    },
    queryFilter(queryString, key) {
      if (!this.booklib) return [];
      queryString = queryString.toLowerCase();
      return _.chain(this.booklib)
        .filter(t => t[key].toLowerCase().startsWith(queryString))
        .uniq(false, t => t[key])
        .map(t => {
          return { value: t[key], book: t };
        })
        .value();
    },
    querySearchTitle(queryString, cb) {
      cb(this.queryFilter(queryString, "title"));
    },
    querySearchAuthor(queryString, cb) {
      cb(this.queryFilter(queryString, "author"));
    },
    querySearchPublisher(queryString, cb) {
      cb(this.queryFilter(queryString, "publisher"));
    },
    handleSelectBookTitle(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
}

.post-form {
  margin: auto;
  border-radius: 6px;
  background: #ffffff;
  width: 800px;
  padding: 2em;
}
</style>