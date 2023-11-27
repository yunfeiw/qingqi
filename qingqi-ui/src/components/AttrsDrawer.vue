<!--
 * @Descripttion:  元素属性值修改
 * @Author: yunfei
 * @Date: 2023-11-10 17:00:19
-->
<script setup>
import { ref } from "vue";
// 属性组件
import {
  InputFormAttr,
  SelectFormAttr,
  ButtonAttr,
  TableAttr,
  DatePickerAttr,
  DatePickerFormAttr,
  SwitchFormAttr,
  UploadAttr,
  DownloadAttr,
} from "@qingqi/meta";
// 数据
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
  <el-drawer title="属性" v-model="show" :append-to-body="true" :size="600">
    <input-form-attr :data="data" v-if="data.type == 'InputForm'" />
    <select-form-attr :data="data" v-if="data.type == 'SelectForm'" />
    <button-attr :data="data" v-if="data.type == 'button'" />
    <table-attr :data="data" v-if="data.type == 'table'" />
    <date-picker-attr :data="data" v-if="data.type == 'datepicker'" />
    <date-picker-form-attr :data="data" v-if="data.type == 'DatePickerForm'" />
    <switch-form-attr :data="data" v-if="data.type == 'SwitchForm'" />
    <download-attr :data="data" v-if="data.type == 'download'" />
    <upload-attr :data="data" v-if="data.type == 'upload'" />

    <!-- <template v-else>
      <el-form-item label="text">
        <el-input v-model="data.text" />
      </el-form-item>
      <el-form-item label="v-model">
        <el-input v-model="data['v-model']" />
      </el-form-item>

      <el-form-item label="label">
        <el-input v-model="data.label" />
      </el-form-item>
    </template> -->
  </el-drawer>
</template>
