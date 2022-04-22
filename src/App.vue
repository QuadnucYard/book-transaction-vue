<template>
  <div id="app">
    <nav>
      <div>222</div>
      <div>333</div>
    </nav>
    <el-header class="header">Header</el-header>
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

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  position: fixed;
  width: 3.7em;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  line-height: 1.2;
  z-index: 5;
  background: rgb(52, 73, 94);
  color: white;
}

.main {
  background-color: rgb(239, 239, 239);
}

.aside {
  background: rgb(52, 73, 94);
}

.header {
  line-height: 60px;
  background-color: white;
  /* color: white; */
}

.footer {
  background-color: rgba(0, 0, 0, 0.75);
  position: relative;
  height: 200px;
}
</style>