<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%; width: 95%">
      <el-table :data="goods" stripe style="width: 100%" :max-height="tableHeight">
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
        <el-table-column prop="name" label="商品名称" sortable fit> </el-table-column>
        <el-table-column prop="seller.name" label="卖家" sortable fit> </el-table-column>
        <el-table-column prop="price" label="价格" sortable fit> </el-table-column>
        <el-table-column prop="date" label="发布日期" width="120"> </el-table-column>
        <el-table-column prop="desc" label="简介" show-overflow-tooltip fit> </el-table-column>
        <el-table-column label="状态" sortable width="120">
          <template #default="{ row }">
            <el-select v-model="row.status" @change="v => commitStatusChange(v, row)">
              <el-option label="待审核" :value="0" />
              <el-option label="正常" :value="1" />
              <el-option label="已关闭" :value="2" />
              <el-option label="已删除" :value="3" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template #default="{ row }">
            <!-- <el-button @click.prevent="editGoods(row)" type="text" size="small"> 编辑 </el-button> -->
            <el-button @click.prevent="deleteGoods(row.id)" type="text" size="small">
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
      goods: [],
    };
  },
  mounted() {
    this.loadGoods();
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320;
    },
  },
  methods: {
    deleteGoods(id) {
      this.$confirm("此操作将永久删除该书籍, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("del", id);
          this.$http.post("/admin/content/goods/delete", { id: id }).then(resp => {
            if (resp && resp.data.code === 200) {
              this.loadGoods();
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
    editGoods(item) {
      this.$refs.edit.dialogFormVisible = true;
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        publisher: item.publisher,
        abs: item.abs,
      };
    },
    loadGoods() {
      var _this = this;
      this.$http.get("/goods/list", { params: { keywords: "" } }).then(resp => {
        if (resp && resp.data.code === 200) {
          _this.goods = resp.data.result;
        }
      });
    },
    commitStatusChange(value, goods) {
      this.$http
        .put("/admin/content/goods/status", {
          id: goods.id,
          status: value,
        })
        .then(resp => {
          if (resp && resp.data.code === 200) {
            this.$message("成功更改状态");
          }
        });
    },
  },
};
</script>

<style scoped>
</style>
