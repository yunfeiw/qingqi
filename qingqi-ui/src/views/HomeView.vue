<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-18 10:23:58
-->
<script setup lang="ts">
import { ref, toRefs, onMounted } from "vue";
import MoveWarp from "../components/MoveWarp.vue";
import AttrsDrawer from "../components/AttrsDrawer.vue";
import { useCoordinate } from "@/stores/coordinate";
const coordinate = useCoordinate();
const { width, height } = coordinate.target.getBoundingClientRect
  ? coordinate.target.getBoundingClientRect()
  : { width: 0, height: 0 };

const attrEle = ref();
// 属性
const attr_change = (v: {}) => {
  attrEle.value.handle();
};

onMounted(() => {
  window.addEventListener("mousemove", (e) => {
    if (coordinate.flag) {
      const { left, top } = document
        .querySelector(".edit_right")
        .getBoundingClientRect();
      let [x, y] = [
        e.clientX - left <= 0 ? 0 : e.clientX - left - 10,
        e.clientY - top <= 0 ? 0 : e.clientY - top - 35,
      ];
      coordinate.target.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
  });
});
</script>

<template>
  <div class="edit_box">
    <!-- 左 -->
    <div class="edit_left">
      <el-tag class="c c1" effect="dark">input</el-tag>
      <el-tag class="c c2" effect="dark">select</el-tag>
      <el-tag class="c c3" effect="dark">button</el-tag>
      <el-tag class="c c4" effect="dark">radio</el-tag>
    </div>
    <!-- 右 -->
    <div class="edit_right">
      <move-warp @attr_change="attr_change">
        <el-button type="primary">Primary</el-button>
      </move-warp>
    </div>
    <!-- 属性 -->
    <attrs-drawer ref="attrEle" />
  </div>
</template>

<style scoped>
.edit_box {
  display: flex;
  width: 100%;
  height: 100%;
}
.edit_left {
  padding-top: 10px;
  width: 200px;
  height: 100%;
}
.edit_right {
  flex: 1 1 auto;
  border-left: 1px solid #ccc;
  position: relative;
}

.el-tag {
  cursor: pointer;
  margin: 2px 5px;
  opacity: 0.85;
  transition: all 0.2s;
}
.el-tag:hover {
  opacity: 1;
}
</style>
