<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-22 15:25:10
-->
<script setup lang="ts">
/*
 * @Descripttion: input-form 按钮属性设置
 * @Author: yunfei
 * @Date: 2023-01-31 10:35:24
 */
defineProps(["data"]);
</script>
<template>
  <el-form :model="data" label-width="100px">
    <el-form-item label="text">
      <el-input v-model="data.text" />
    </el-form-item>
    <el-form-item label="type">
      <el-radio-group v-model="data.props.type">
        <el-radio label="primary" />
        <el-radio label="success" />
        <el-radio label="warning" />
        <el-radio label="danger" />
        <el-radio label="info" />
        <el-radio label="default" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="plain">
      <el-switch v-model="data.props.plain" />
    </el-form-item>
    <el-form-item label="size(占用)">
      <el-radio-group v-model="data.props.size">
        <el-radio label="large" />
        <el-radio label="default" />
        <el-radio label="small" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Function">
      <el-input v-model="data.props.function" :rows="4" type="textarea" />
    </el-form-item>
  </el-form>
</template>
