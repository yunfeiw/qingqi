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
  <el-drawer v-model="show" title="属性" size="200">
    <p>_(:зゝ∠)_</p>
  </el-drawer>
</template>
