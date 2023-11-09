<script setup lang="ts"></script>

<template>
  <div class="edit_box">
    <!-- 左 -->
    <div class="edit_left">
      <el-tag>Tag 1</el-tag>
      <el-tag class="ml-2" effect="dark" type="success">Tag 2</el-tag>
      <el-tag class="ml-2" effect="dark" type="info">Tag 3</el-tag>
      <el-tag class="ml-2" effect="dark" type="warning">Tag 4</el-tag>
      <el-tag class="ml-2" effect="dark" type="danger">Tag 5</el-tag>
    </div>
    <!-- 右 -->
    <div class="edit_right"></div>
  </div>
</template>

<style scoped>
.edit_box {
  display: flex;
  width: 100%;
  height: 100%;
}
.edit_left {
  width: 200px;
  height: 100%;
}
.edit_right {
  flex: 1 1 auto;
  border-left: 1px solid #ccc;
}
</style>
