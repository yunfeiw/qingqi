<!--
 * @Descripttion: date-picker-form
 * @Author: yunfei
 * @Date: 2023-11-23 11:01:06
-->
<script setup lang="ts">
defineProps(["data"]);
</script>
<template>
  <el-form :model="data" label-width="100px">
    <el-form-item label="label">
      <el-input v-model="data.label" />
    </el-form-item>
    <el-form-item label="type">
      <el-radio-group v-model="data.props.type">
        <el-radio label="year" />
        <el-radio label="month" />
        <el-radio label="date" />
        <el-radio label="dates" />
        <el-radio label="datetime" />
        <el-radio label="week" />
        <el-radio label="datetimerange" />
        <el-radio label="daterange" />
        <el-radio label="monthrange" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="v-model">
      <el-input v-model="data.props['v-model']" />
    </el-form-item>
    <el-form-item label="placeholder">
      <el-input v-model="data.props['placeholder']" />
    </el-form-item>
    <el-form-item label="format">
      <el-input v-model="data.props['format']" />
    </el-form-item>
    <el-form-item label="clearable">
      <el-switch v-model="data.props.clearable" />
    </el-form-item>
    <el-form-item label="disabled">
      <el-switch v-model="data.props.disabled" />
    </el-form-item>
    <el-form-item label="readonly">
      <el-switch v-model="data.props.readonly" />
    </el-form-item>
    <el-form-item label="editable">
      <el-switch v-model="data.props.editable" />
    </el-form-item>
    <el-form-item label="size(占用)">
      <el-radio-group v-model="data.props.size">
        <el-radio label="large" />
        <el-radio label="small" />
        <el-radio label="default" />
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
