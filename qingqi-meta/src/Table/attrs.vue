<!--
 * @Descripttion: table 属性设置
 * @Author: yunfei
 * @Date: 2023-11-22 11:55:16
-->
<script setup lang="ts">
const { data } = defineProps(["data"]);
console.log("data", data);
// 新增
const add = (i) => {
  let _id = `id_${Date.now()}`;
  data.props.column.splice(i + 1, 0, {
    prop: _id,
    label: _id,
    width: "200",
  });
};
// 删除 coll
const rvm = (i) => {
  data.props.column.splice(i, 1);
};

// 新增 btn
const addbtn = () => {
  data.btns.push({ text: "按钮" });
};
// 删除 btn
const rvmbtn = (i) => {
  data.btns.splice(i, 1);
};
</script>
<template>
  <el-form size="small" :model="data" label-width="90px">
    <!-- tabel 属性 -->
    <el-form-item label="api">
      <el-input v-model="data.api" />
    </el-form-item>
    <el-form-item label="border">
      <el-switch v-model="data.border" />
    </el-form-item>
    <el-form-item label="多选/单选">
      <el-radio-group v-model="data.props.xh">
        <el-radio label="radio" />
        <el-radio label="checkbox" />
        <el-radio label="" />
      </el-radio-group>
      <el-button @click="addbtn">+操作</el-button>
    </el-form-item>
    <!-- <el-form-item label="+操作">
    </el-form-item> -->
    <el-form-item label="width">
      <el-input v-model="data.props.style.width" />
    </el-form-item>
    <el-divider />
    <!-- column 属性 -->
    <el-row v-for="(e, i) in data.props.column" :key="i">
      <el-col :span="8">
        <el-form-item label="label">
          <el-input v-model="data.props.column[i]['label']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="prop">
          <el-input v-model="data.props.column[i]['prop']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="width">
          <el-input v-model="data.props.column[i]['width']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="flex">
          <el-input v-model="data.props.column[i]['fixed']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="sortable">
          <el-switch v-model="data.props.column[i]['sortable']" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="" label-width="0">
          <el-button @click="add(i)" type="success">新增</el-button>
          <el-button @click="rvm(i)" type="danger">删除</el-button>
        </el-form-item>
      </el-col>
      <el-divider />
    </el-row>
    <el-row v-if="data.btns.length != 0">
      <el-col :span="8">
        <el-form-item label="label">
          <el-input v-model="data.btnprops.label" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="fixed">
          <el-input v-model="data.btnprops.fixed" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="width">
          <el-input v-model="data.btnprops.width" />
        </el-form-item>
      </el-col>

      <el-col :span="8" v-for="(e, i) in data.btns" :key="i">
        <el-input style="width: 90px" v-model="data.btns[i]['text']" />
        <el-button @click="rvmbtn(i)" type="danger">删除</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
