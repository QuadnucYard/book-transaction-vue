<template>
  <div id="app">
    <el-header class="header">
      <nav-menu></nav-menu>
    </el-header>
    <div class="main">
      <router-view />
    </div>
    <!-- <el-footer class="footer">
      <div>My Footer</div>
    </el-footer> -->
  </div>
</template>

<script>
import NavMenu from "./components/common/navmenu.vue";

export default {
  name: "App",
  components: { NavMenu },
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

.main {
  background-color: rgb(239, 239, 239);
}

.aside {
  background: rgb(52, 73, 94);
}

.header {
  line-height: 60px;
  background-color: white;
}

.footer {
  background-color: rgba(0, 0, 0, 0.75);
  position: relative;
  height: 200px;
}
</style>