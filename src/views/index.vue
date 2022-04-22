<template>
  <div>
    <div style="margin-top: 2em; margin-bottom: 10em">
      <span> <router-link :to="{ name: 'register' }">注册</router-link></span>
      <span> <router-link :to="{ name: 'login' }">登录</router-link></span>
    </div>
    <div>这是主页</div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
div > span {
  margin: 1em;
}
</style>