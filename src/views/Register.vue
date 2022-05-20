<template>
  <div class="page-register" style="padding: 1em">
    <section>
      <div>
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="rules"
          label-width="100px"
          class="demo-registerForm"
          autocomplete="off">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerForm.name" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="registerForm.pwd" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="cpwd">
            <el-input v-model="registerForm.cpwd" type="password" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="registerForm.code" maxlength="4" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" />
            <el-button size="small" round @click="sendMsg">发送验证码</el-button>
            <span class="status">{{ statusMsg }}</span>
          </el-form-item>
          <el-form-item prop="agreed">
            <el-checkbox v-model="registerForm.agreed">同意注册协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="login">
          <span class="bold">已有账号？</span>
          <span><router-link :to="{ name: 'login' }">登录</router-link></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { encrypt } from "../utils/rsaEncrypt";

export default {
  data() {
    return {
      step: 2,
      active: 0,
      statusMsg: "",
      error: "",
      registerForm: {
        name: "",
        code: "",
        pwd: "",
        cpwd: "",
        email: "",
        agreed: false,
      },
      rules: {
        agreed: [
          {
            validator: (rule, value, callback) => {
              console.log("value:" + value);
              if (value !== true) {
                callback(new Error("请确认同意注册协议"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            type: "string",
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        pwd: [
          {
            required: true,
            message: "创建密码",
            trigger: "blur",
          },
        ],
        cpwd: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.registerForm.pwd) {
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
  layout: "blank",
  methods: {
    sendMsg: function () {
      const self = this;
      let namePass;
      let emailPass;
      if (self.timerid) {
        return false;
      }
      this.$refs["registerForm"].validateField("name", valid => {
        namePass = valid;
      });
      self.statusMsg = "";
      if (namePass) {
        return false;
      }
      this.$refs["registerForm"].validateField("email", valid => {
        emailPass = valid;
      });
      // 模拟验证码发送
      if (!namePass && !emailPass) {
        let count = 60;
        self.statusMsg = `验证码已发送,剩余${count--}秒`;
        self.timerid = setInterval(function () {
          self.statusMsg = `验证码已发送,剩余${count--}秒`;
          if (count === 0) {
            clearInterval(self.timerid);
          }
        }, 1000);
      }
    },
    // 模拟登录
    register: function () {
      let self = this;
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          //setTimeout(this.$router.push({ name: "login" }), 1000);
          this.$http
            .post("/auth/register", {
              username: this.registerForm.name,
              password: this.registerForm.pwd,
              name: "",
              phone: "",
              email: this.registerForm.email,
            })
            .then(res => {
              console.log("reRegister", res.data);
              if (res.data.code == 200) {
                self.$store.commit("login", res.data.result);
                let path = self.$route.query.redirect;
                if (path) {
                  self.$router.replace({ path: path });
                } else {
                  self.$router.replace({ name: "index" });
                }
                ElMessage({ message: res.data.message, type: "success" });
              } else {
                ElMessage({ message: res.data.message, type: "error" });
              }
            })
            .catch(err => {
              ElMessage({ message: "注册失败，网络连接错误", type: "error" });
            });
        }
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.page-register {
  .register {
    color: #1890ff;
  }

  a {
    color: #1890ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
  }

  > section {
    margin: 0em auto 0em;
    padding-top: 30px;
    width: 400px;
    box-sizing: border-box;

    > div {
      background-color: white;
      padding: 1em 1em;
    }

    .status {
      font-size: 12px;
      margin-left: 20px;
      color: #e6a23c;
    }

    .error {
      color: red;
    }
  }
}
</style>