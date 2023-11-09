<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-09 10:52:54
-->
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
const activeIndex = ref("/");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<template>
  <div class="qq_head">
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      :router="true"
      @select="handleSelect"
      :default-active="activeIndex"
    >
      <el-menu-item class="logo">
        <img style="width: 50px" src="/logo.png" />qingqi
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/">layout</el-menu-item>
      <el-menu-item index="/preview">preview</el-menu-item>
      <el-menu-item index="/about">about</el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
