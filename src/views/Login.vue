<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">欢迎使用</h3>
      <el-form-item prop="username">
        <label>用户名</label>
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="用户名、手机号或电子邮箱"
        />
      </el-form-item>
      <el-form-item prop="password">
        <label>密码</label>
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        />
      </el-form-item>
      <el-form-item prop="code">
        <label>验证码</label>
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        />
        <div class="login-code">
          <!-- <img :src="codeUrl" @click="getCode" /> -->
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe"> 记住我 </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <el-form-item style="width: 100%">
        <router-link :to="{ name: 'register' }">注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 加密
import { encrypt } from "../utils/rsaEncrypt.js";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";
export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePass: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    // 获取验证码
    this.getCode();
    // 获取用户名密码等Cookie
    this.getCookie();
    // token 过期提示
    this.point();
  },
  methods: {
    getCode() {
      // 模拟返回验证码图片
      this.codeUrl =
        "http://www.demodashi.com/ueditor/jsp/upload/image/20170802/1501642847473057707.jpeg";
      this.loginForm.uuid = "111";
    },
    getCookie() {
      const username = Cookies.get("username");
      let password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? "" : password;
      password = password === undefined ? this.loginForm.password : password;
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: "",
      };
    },
    handleLogin() {
      const self = this;
      console.log(this);
      this.$refs.loginForm.validate((valid) => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid,
        };
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password);
        }
        if (valid) {
          this.loading = true;
          if (user.rememberMe) {
            Cookies.set("username", user.username, {
              expires: Config.passCookieExpires,
            });
            Cookies.set("password", user.password, {
              expires: Config.passCookieExpires,
            });
            Cookies.set("rememberMe", user.rememberMe, {
              expires: Config.passCookieExpires,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          // 模拟登录成功
          console.log("登录成功");
          self.$router.push({ name: "index" });
          ElMessage({
            message: "登录成功",
            type: "success",
          });
        } else {
          console.log("error submit!!");
          ElMessage({
            message: "登录失败",
            type: "error",
          });
          return false;
        }
      });
    },
    point() {
      const point = Cookies.get("point") !== undefined;
      if (point) {
        /*this.$notify({
          title: "提示",
          message: "当前登录状态已过期，请重新登录！",
          type: "warning",
          duration: 5000,
        });*/
        Cookies.remove("point");
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  margin: 2em;
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  //float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.register {
  float: right;
  color: rgb(24, 144, 255);
}
a {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}
</style>