<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-10 15:49:09
-->
<script setup>
import { useCoordinate } from "@/stores/coordinate";
import { ref } from "vue";
const coordinate = useCoordinate();
const warpEle = ref();
// 按下
const mousedown = () => {
  coordinate.setFlag(true);
  coordinate.setTarget(warpEle.value);
};
// 松开
const mouseup = () => {
  coordinate.setFlag(false);
};
// 移动
</script>
<template>
  <div class="move_warp_com" ref="warpEle">
    <div class="util_box">
      <el-icon
        @mousedown="mousedown"
        @mouseup="mouseup"
        class="move_icon"
        :size="16"
        ><Notification
      /></el-icon>
      <el-icon @click="$emit('attr_change')" :size="16"> <Edit /> </el-icon>
    </div>
    <slot></slot>
  </div>
</template>
<style scoped>
.move_warp_com {
  /* position: absolute; */
  display: inline-block;
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
