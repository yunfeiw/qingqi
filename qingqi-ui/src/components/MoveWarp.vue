<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-11-10 15:49:09
-->
<script setup lang="ts">
let props = defineProps<{
  _id: string;
}>();

import { useCoordinate } from "@/stores/coordinate";
import { useItems } from "@/stores/items";
import { ref } from "vue";
const coordinate = useCoordinate();
const items = useItems();
const warpEle = ref();
// 按下
const mousedown = () => {
  coordinate.setFlag(true);
  // 存储当前node
  coordinate.setTarget(warpEle.value, props._id);
};
// 松开
const mouseup = () => {
  coordinate.setFlag(false);
};
// 删除
const removeHandle = () => {
  items.rm(props._id);
};
</script>
<template>
  <div class="move_warp_com" ref="warpEle">
    <div class="util_box">
      <el-icon
        @mousedown="mousedown"
        @mouseup="mouseup"
        class="move_icon"
        :size="20"
        ><Notification
      /></el-icon>
      <el-icon @click="$emit('attr_change')" :size="20"> <Edit /> </el-icon>
      <el-icon @click="removeHandle" :size="20"><CircleClose /></el-icon>
    </div>
    <slot></slot>
  </div>
</template>
<style scoped>
.move_warp_com {
  position: absolute;
  display: inline-block;
}
.move_warp_com:hover .util_box {
  display: block;
}
.util_box {
  display: none;
  position: absolute;
  bottom: -25px;
  left: 0px;
  width: 90px;
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
