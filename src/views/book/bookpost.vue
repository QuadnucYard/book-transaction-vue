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
        <el-form-item prop="book.title" label="书名">
          <el-input v-model="postForm.book.title" type="text" />
        </el-form-item>
        <el-form-item prop="book.author" label="作者">
          <el-input v-model="postForm.book.author" type="text" />
        </el-form-item>
        <el-form-item prop="bookpublisher" label="出版社">
          <el-input v-model="postForm.book.publisher" type="text" />
        </el-form-item>
        <el-form-item prop="bookdate" label="出版日期">
          <el-date-picker v-model="postForm.book.date" type="date" />
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
import request from "@/utils/request.js";

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
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          ElMessage.info("提交请求");
          request({
            url: "/goods/post",
            method: "post",
            data: this.postForm,
          }).then((res) => {
            console.log(res);
            ElMessage.success("成功发布");
            this.$router.push({ name: "index" });
          });
        }
      });
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