<script setup></script>
<template>
  <div class="move_warp_com">
    <div class="util_box">
      <el-icon class="move_icon" :size="16"><Notification /></el-icon>
      <el-icon @click="$emit('attr_change')" :size="16"> <Edit /> </el-icon>
    </div>
    <slot></slot>
  </div>
</template>
<style scoped>
.move_warp_com {
  position: absolute;
}
.move_warp_com:hover .util_box {
  display: block;
}
.util_box {
  display: none;
  position: absolute;
  top: 30px;
  left: 0;
  width: 60px;
  background: #fff;
  border-radius: 5px;
}
.util_box i {
  cursor: pointer;
  margin: 2px 5px;
}
.util_box i:hover {
  color: #e4651c;
}
.util_box .move_icon {
  cursor: move;
}
</style>
