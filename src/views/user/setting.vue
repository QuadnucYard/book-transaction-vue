<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-position="right"
      label-width="6em"
      class="post-form">
      <h3>修改密码</h3>
      <el-form-item prop="username" label="用户名">
        <el-input v-model="ruleForm.username" type="text" style="width: 15em" />
      </el-form-item>
      <el-form-item prop="pwdOld" label="原密码">
        <el-input v-model="ruleForm.pwdOld" type="password" style="width: 15em" />
      </el-form-item>
      <el-form-item prop="pwdNew" label="新密码">
        <el-input v-model="ruleForm.pwdNew" type="password" style="width: 15em" />
      </el-form-item>
      <el-form-item prop="pwdNew2" label="再次输入">
        <el-input v-model="ruleForm.pwdNew2" type="password" style="width: 15em" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  setup() {},
  data() {
    return {
      ruleForm: {
        username: "",
        pwdOld: "",
        pwdNew: "",
        pwdNew2: "",
      },
      rules: {
        username: [{ required: true, trigger: "blur", message: "输入用户名" }],
        pwdOld: [{ required: true, trigger: "blur", message: "输入密码" }],
        pwdNew2: [
          {
            validator: (rule, value, callback) => {
              if (this.ruleForm.pwdNew !== "" && value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwdNew) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    const self = this;
    /*this.$http.get("user/" + this.$store.state.user.uid).then(res => {
      const user = res.data.result;
      self.ruleForm.username = user.username;
    });*/
    self.ruleForm.username = this.$store.state.user.name;
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http
            .put("user/password", {
              id: this.$store.state.user.uid,
              username: this.ruleForm.username,
              password: this.ruleForm.pwdOld,
              newpwd: this.ruleForm.pwdNew,
            })
            .then(res => {
              console.log("rePassword", res.data);
              if (res.data.code == 200) {
                ElMessage({ message: res.data.message, type: "success" });
              } else {
                ElMessage({ message: res.data.message, type: "error" });
              }
            });
        }
      });
    },
  },
};
</script>