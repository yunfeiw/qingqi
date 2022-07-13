<!--
 * @Descripttion: 面包屑
 * @Author: yunfei
 * @Date: 2022-07-13 16:50:40
-->
<template>
  <div class="crumbs-com">
    <div class="crumbs_item" v-for="item in arr" :key="item">item</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3, 4, 5],
    };
  },
};
</script>

<style lang='scss'>
.crumbs-com {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 40px;
  // 元素
  .crumbs_item {
    margin-right: 10px;
  }
}
</style>