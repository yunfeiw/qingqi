<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-10 17:00:19
-->
<script setup>
import { ref, defineExpose } from "vue";
const show = ref(false);
const handle = () => {
  show.value = true;
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
    <p>_(:зゝ∠)_</p>
  </el-drawer>
</template>
