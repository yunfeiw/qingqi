<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-10 17:00:19
-->
<script setup>
import { ref, defineExpose } from "vue";

const data = ref();
const show = ref(false);
const handle = (v) => {
  show.value = true;
  data.value = v;
};
defineExpose({
  handle,
});
</script>
<template>
  <el-drawer
    :append-to-body="true"
    v-model="show"
    :modal="false"
    title="属性"
    size="500"
  >
    <el-form-item label="text">
      <el-input v-model="data.text" />
    </el-form-item>
    <el-form-item label="v-model">
      <el-input v-model="data['v-model']" />
    </el-form-item>

    <el-form-item label="label">
      <el-input v-model="data.label" />
    </el-form-item>
  </el-drawer>
</template>
