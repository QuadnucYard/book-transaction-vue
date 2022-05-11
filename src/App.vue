<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'booklist' }"><div>Item1</div></router-link>
      <div>Item2</div>
    </nav>
    <el-header class="header">
      <div style="margin-top: 2em; margin-bottom: 10em">
        <span> <router-link :to="{ name: 'index' }">主页</router-link></span>
        <span> <router-link :to="{ name: 'register' }">注册</router-link></span>
        <span> <router-link :to="{ name: 'login' }">登录</router-link></span>
      </div>
    </el-header>
    <!-- <el-menu>
      <el-menu-item>item1</el-menu-item>
    </el-menu>
    <el-aside class="aside">Aside</el-aside> -->
    <div class="main">
      <router-view />
    </div>
    <el-footer class="footer">
      <div>My Footer</div>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

nav {
  position: fixed;
  top: 0;
  width: 3.7em;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  line-height: 1.2;
  z-index: 5;
  background: rgb(90 177 190);
  color: white;

  div {
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: #91c5da;
  }
}

.main {
  background-color: rgb(239, 239, 239);
  margin-left: 3.7em;
}

.aside {
  background: rgb(52, 73, 94);
}

.header {
  line-height: 60px;
  background-color: white;
  /* color: white; */
  margin-left: 3.7em;
}

.footer {
  background-color: rgba(0, 0, 0, 0.75);
  position: relative;
  height: 200px;
  margin-left: 3.7em;
}
</style>