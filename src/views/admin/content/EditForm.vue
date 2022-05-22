<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true"
      ><slot name="operation"></slot>
    </el-button>
    <el-dialog :title="caption" v-model="dialogFormVisible" @close="clear">
      <el-form v-model="form" style="text-align: left" ref="form">
        <slot name="eform"> </slot>
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
  props: {
    caption: {
      required: true,
    },
    form: {
      required: true,
    },
  },
  components: { ImgUpload },
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    clear() {
      //this.$refs.imgUpload.clear();
      for (let k in this.$props.form) {
        if (this.$props.form[k] instanceof String) this.$props.form[k] = "";
        else if (this.$props.form[k] instanceof Date) this.$props.form[k] = null;
        else this.$props.form[k] = undefined;
      }
    },
    uploadImg() {
      this.form.cover = this.$refs.imgUpload.url;
    },
    onSubmit() {
      this.$emit("submit");
    },
  },
};
</script>

<style scoped>
.add-button {
  margin: 18px 0 0 10px;
}
</style>
