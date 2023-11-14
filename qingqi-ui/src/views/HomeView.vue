<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-18 10:23:58
-->
<script setup lang="ts">
import { button, input, select, inputForm } from "@qingqi/meta";
import { ref, toRefs, onMounted } from "vue";
import MoveWarp from "../components/MoveWarp.vue";
import AttrsDrawer from "../components/AttrsDrawer.vue";
import { Render } from "@/components/Render.tsx";
// store
import { useCoordinate } from "@/stores/coordinate";
import { useItems } from "@/stores/items";

const coordinate = useCoordinate();
const items = useItems();
const attrEle = ref();

// 修改属性
const attr_change = (v: {}) => {
  console.log("属性", v);
  attrEle.value.handle(v);
};
// 选择
const eleHandle = (v: string) => {
  switch (v) {
    case "button":
      items.setItem({ _id: "_" + new Date().getTime(), ...button });
      break;
    case "input":
      items.setItem({ _id: "_" + new Date().getTime(), ...input });
      break;
    case "select":
      items.setItem({ _id: "_" + new Date().getTime(), ...select });
      break;
    case "inputForm":
      items.setItem({ _id: "_" + new Date().getTime(), ...inputForm });
      break;
    default:
      break;
  }
};
// 输出
const consoleHandle = () => {
  console.log("items.value", items.list);
};
onMounted(() => {
  // 拖拽事件
  window.addEventListener("mousemove", (e) => {
    if (coordinate.flag) {
      const { left, top } = document
        .querySelector(".edit_right")
        .getBoundingClientRect();

      const { height } = coordinate.target.getBoundingClientRect();

      let [x, y] = [
        e.clientX - left <= 0 ? 0 : e.clientX - left - 15,
        e.clientY - top <= 0 ? 0 : e.clientY - top - height - 5,
      ];
      items.list[coordinate._id].x = x;
      items.list[coordinate._id].y = y;
      coordinate.target.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
  });
});
</script>

<template>
  <div class="edit_box">
    <!-- 左 -->
    <div class="edit_left">
      <el-tag @click="eleHandle('button')" effect="dark">button</el-tag>
      <el-tag @click="eleHandle('input')" effect="dark">input</el-tag>
      <el-tag @click="eleHandle('select')" effect="dark">select</el-tag>
      <el-tag @click="eleHandle('inputForm')" effect="dark">inputForm</el-tag>
      <el-tag @click="consoleHandle" effect="dark">console</el-tag>
    </div>
    <!-- 右 -->
    <div class="edit_right">
      <move-warp
        v-for="item in items.list"
        :_id="item._id"
        @attr_change="attr_change(item)"
      >
        <Render :prop="item" />
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
