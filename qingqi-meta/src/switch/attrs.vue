<!--
 * @Descripttion: 开关属性设置
 * @Author: yunfei
 * @Date: 2023-11-22 11:55:16
-->
<script setup lang="ts">
defineProps(["data"]);
</script>
<template>
  <el-form :model="data" label-width="100px">
    <el-form-item label="v-model">
      <el-input v-model="data.props['v-model']" />
    </el-form-item>
    <el-form-item label="size">
      <el-radio-group v-model="data.props.size">
        <el-radio label="large" />
        <el-radio label="small" />
        <el-radio label="default" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="disabled">
      <el-switch v-model="data.props.disabled" />
    </el-form-item>
    <el-form-item label="Function">
      <el-input v-model="data.props.function" :rows="4" type="textarea" />
    </el-form-item>
  </el-form>
</template>
