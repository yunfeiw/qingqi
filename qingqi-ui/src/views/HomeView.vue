<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-18 10:23:58
-->
<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2023-10-18 10:23:58
-->
<script setup lang="ts">
import {
  button,
  input,
  select,
  datepicker,
  InputForm,
  SelectForm,
  DatePickerForm,
  table,
  Switch,
  SwitchForm,
  download,
  upload,
} from "@qingqi/meta";
import { clone } from "ramda";
import { ref, toRefs, onMounted } from "vue";
import { Arrange } from "../utils/Arrange.ts";
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
  attrEle.value.handle(v);
};
// 选择
const eleHandle = (v: string) => {
  switch (v) {
    case "button":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(button) });
      break;
    case "input":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(input) });
      break;
    case "Switch":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(Switch) });
      break;
    case "select":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(select) });
      break;
    case "datepicker":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(datepicker) });
      break;
    case "upload":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(upload) });
      break;
    case "download":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(download) });
      break;

      
    case "InputForm":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(InputForm) });
      break;
    case "SelectForm":
      items.setItem({
        _id: "_" + new Date().getTime(),
        ...clone(SelectForm),
      });
      break;

    case "SwitchForm":
      items.setItem({
        _id: "_" + new Date().getTime(),
        ...clone(SwitchForm),
      });
      break;

    case "DatePickerForm":
      items.setItem({
        _id: "_" + new Date().getTime(),
        ...clone(DatePickerForm),
      });
      break;
    case "table":
      items.setItem({ _id: "_" + new Date().getTime(), ...clone(table) });
      break;
    default:
      break;
  }
};
// 输出
const consoleHandle = () => {
  console.log("items.value", Arrange(items.list));
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
      <el-divider content-position="left">单元组件</el-divider>

      <el-tag @click="eleHandle('button')" effect="dark">button</el-tag>
      <el-tag @click="eleHandle('input')" effect="dark">input</el-tag>
      <el-tag @click="eleHandle('select')" effect="dark">select</el-tag>
      <el-tag @click="eleHandle('datepicker')" effect="dark">datepicker</el-tag>
      <el-tag @click="eleHandle('Switch')" effect="dark">switch</el-tag>
      <el-tag @click="eleHandle('download')" effect="dark">download</el-tag>
      <el-tag @click="eleHandle('upload')" effect="dark">upload</el-tag>

      <el-divider content-position="left">表单元素</el-divider>
      <el-tag @click="eleHandle('InputForm')" type="success" effect="dark"
        >input</el-tag
      >
      <el-tag @click="eleHandle('SelectForm')" type="success" effect="dark"
        >select</el-tag
      >
      <el-tag @click="eleHandle('DatePickerForm')" type="success" effect="dark"
        >datepicker</el-tag
      >
      <el-tag @click="eleHandle('SwitchForm')" type="success" effect="dark"
        >switch</el-tag
      >

      <el-divider content-position="left">表格元素</el-divider>
      <el-tag @click="eleHandle('table')" type="warning" effect="dark"
        >table</el-tag
      >
      <el-tag @click="eleHandle('drawer')" type="warning" effect="dark"
        >drawer</el-tag
      >
      <el-tag @click="eleHandle('modal')" type="warning" effect="dark"
        >modal</el-tag
      >

      <el-divider />
      <el-tag @click="consoleHandle" effect="dark">打印数据</el-tag>
    </div>
    <!-- 右 -->
    <div class="edit_right">
      <move-warp
        v-for="item in items.list"
        :key="item['_id']"
        :item="item"
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
