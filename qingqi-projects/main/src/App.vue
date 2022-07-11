<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-06-29 15:19:55
-->
<template>
  <div class="app_box">
    <!-- 左 -->
    <div class="app_l_box">
    </div>
    <!-- 右 -->
    <div class="app_r_box">
      <!-- header -->
      <div class="header"></div>
      <!-- 微服务 -->
      <div id="micro_container"></div>
    </div>
  </div>

  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div> -->
</template>

<script>
export default {
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.app_box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;

  // 左
  .app_l_box {
    width: 300px;
    background: lightcoral;
  }
  // 右
  .app_r_box {
    display: flex;
    flex: 1;
    flex-direction: column;
    background: khaki;
    // header
    .header {
      width: 100%;
      height: 100px;
      background: darkcyan;
    }

    #micro_container {
      flex: 1;
      background: darkmagenta;
    }
  }
}
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
