<!--
 * @Descripttion: 导入
 * @Author: yunfei
 * @Date: 2023-11-23 11:01:06
-->
<script setup lang="ts">
defineProps(["data"]);
</script>
<template>
  <el-form :model="data" label-width="100px">
    <el-form-item label="text">
      <el-input v-model="data.text" />
    </el-form-item>
    <el-form-item label="key">
      <el-input v-model="data.key" />
    </el-form-item>
  </el-form>
</template>
