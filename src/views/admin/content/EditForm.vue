<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true"
      >添加图书</el-button
    >
    <el-dialog title="添加/修改图书" v-model="dialogFormVisible" @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="不加《》"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker v-model="form.date" type="month"></el-date-picker>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" prop="publisher">
          <el-input v-model="form.publisher" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </el-form-item> -->
        <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
          <el-input type="textarea" v-model="form.abs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from "./ImgUpload.vue";
export default {
  name: "EditForm",
  components: { ImgUpload },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: "",
        title: "",
        author: "",
        date: null,
        publisher: "",
        cover: "",
        abs: "",
        cid: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    clear() {
      //this.$refs.imgUpload.clear();
      this.form = {
        id: "",
        title: "",
        author: "",
        date: null,
        publisher: "",
        cover: "",
        abs: "",
      };
    },
    onSubmit() {
      this.$http
        .post("/admin/content/books", {
          id: this.form.id,
          cover: this.form.cover,
          title: this.form.title,
          author: this.form.author,
          date: this.form.date,
          publisher: this.form.publisher,
          abs: this.form.abs,
        })
        .then(resp => {
          if (resp && resp.data.code === 200) {
            this.dialogFormVisible = false;
            this.$emit("onSubmit");
          }
        });
    },
    uploadImg() {
      this.form.cover = this.$refs.imgUpload.url;
    },
  },
};
</script>

<style scoped>
.add-button {
  margin: 18px 0 0 10px;
}
</style>
