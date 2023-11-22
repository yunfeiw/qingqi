<!--
 * @Descripttion: table 属性设置
 * @Author: yunfei
 * @Date: 2023-11-22 11:55:16
-->
<script setup lang="ts">
defineProps(["data"]);
</script>
<template>
  <el-form :model="data" label-width="90px">
    <!-- type='selection' label prop label width  sortable -->
    <!-- tabel 属性 -->
    <el-form-item label="api">
      <el-input v-model="data.api" />
    </el-form-item>
    <el-form-item label="border">
      <el-switch v-model="data.border" />
    </el-form-item>
    <el-form-item label="width">
      <el-input v-model="data.props.style.width" />
    </el-form-item>
    <el-divider />
    <!-- column 属性 -->
    <el-row v-for="(e, i) in data.props.column">
      <!-- <el-col :span="8">
        <el-form-item label="type">
          <el-select v-model="data.props.column[i]['type']">
            <el-option label="无" value="" />
            <el-option label="selection" value="selection" />
          </el-select>
        </el-form-item>
      </el-col> -->
      <el-col :span="8">
        <el-form-item label="prop">
          <el-input v-model="data.props.column[i]['prop']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="label">
          <el-input v-model="data.props.column[i]['label']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="width">
          <el-input v-model="data.props.column[i]['width']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="flex">
          <el-input v-model="data.props.column[i]['fixed']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="sortable">
          <el-switch v-model="data.props.column[i]['sortable']" />
        </el-form-item>
      </el-col>
      <el-divider />
    </el-row>
  </el-form>
</template>
