<template>
  <main>
    <div>
      <el-form>
        <h3>填写信息</h3>
        <el-form-item label="地址">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      form: {
        address: "",
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss">
</style>