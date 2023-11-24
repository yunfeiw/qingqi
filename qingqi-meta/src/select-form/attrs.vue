<!--
 * @Descripttion: 下拉属性设置
 * @Author: yunfei
 * @Date: 2023-11-22 11:55:16
-->
<script setup lang="ts">
defineProps(["data"]);
</script>
<template>
  <el-form :model="data" label-width="100px">
    <el-form-item label="placeholder">
      <el-input v-model="data.props.placeholder" />
    </el-form-item>
    <el-form-item label="size(占用)">
      <el-radio-group v-model="data.props.size">
        <el-radio label="large" />
        <el-radio label="small" />
        <el-radio label="default" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="v-model">
      <el-input v-model="data.props['v-model']" />
    </el-form-item>
    <el-form-item label="label">
      <el-input v-model="data.label" />
    </el-form-item>
  </el-form>
</template>
