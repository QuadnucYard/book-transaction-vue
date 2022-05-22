<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <edit-form @submit="onSubmit" caption="添加/修改图书" :form="form" ref="edit">
      <template #operation>添加图书</template>
      <template #eform>
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
      </template>
    </edit-form>
    <el-card style="margin: 18px 2%; width: 95%">
      <el-table :data="books" stripe style="width: 100%" :max-height="tableHeight">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-form label-position="left" inline>
              <el-form-item>
                <span>{{ row.abs }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="书名（展开查看摘要）" fit> </el-table-column>
        <el-table-column prop="author" label="作者" fit> </el-table-column>
        <el-table-column prop="date" label="出版日期" width="120"> </el-table-column>
        <el-table-column prop="publisher" label="出版社" fit> </el-table-column>
        <!--<el-table-column-->
        <!--prop="abs"-->
        <!--label="摘要"-->
        <!--show-overflow-tooltip-->
        <!--fit>-->
        <!--</el-table-column>-->
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="{ row }">
            <el-button @click.prevent="editBook(row)" type="text" size="small"> 编辑 </el-button>
            <el-button @click.prevent="deleteBook(row.id)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0; float: left">
        <!-- <el-button>取消选择</el-button>
        <el-button>批量删除</el-button> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import EditForm from "./EditForm.vue";
export default {
  name: "BookManagement",
  components: { EditForm },
  data() {
    return {
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
      formLabelWidth: "6em",
      books: [],
    };
  },
  mounted() {
    this.loadBooks();
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320;
    },
  },
  methods: {
    deleteBook(id) {
      this.$confirm("此操作将永久删除该书籍, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("del", id);
          this.$http.post("/admin/content/books/delete", { id: id }).then(resp => {
            if (resp && resp.data.code === 200) {
              this.loadBooks();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editBook(item) {
      this.$refs.edit.dialogFormVisible = true;
      this.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        publisher: item.publisher,
        abs: item.abs,
      };
    },
    loadBooks() {
      var _this = this;
      this.$http.get("/book/list").then(resp => {
        if (resp && resp.data.code === 200) {
          _this.books = resp.data.result;
        }
      });
    },
    onSubmit() {
      this.$http.post("/admin/content/books", this.form).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$refs.edit.dialogFormVisible = false;
          this.loadBooks();
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
