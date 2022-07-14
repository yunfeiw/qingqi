<!--
 * @Descripttion: 面包屑
 * @Author: yunfei
 * @Date: 2022-07-13 16:50:40
-->
<template>
  <div class="crumbs-com">
    <Tag
      class="crumbs_item"
      v-for="item in crumbs"
      :key="item.name"
      closable
      color="primary"
      type="dot"
      @on-close="handleClose(item)"
      >{{ item.name }}</Tag
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { removeDom } from "@/micro/dom";
// import { showMicro, removeDom } from "@/micro/dom";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      crumbs: (state) => state.crumbs.crumbs,
    }),
  },
  methods: {
    ...mapActions(["rmCrumbs"]),
    /**
     * @descript 查找
     */
    findTab(data) {
      return this.crumbs.find((e) => (e.key == data.key));
    },
    handleClose(item) {
      let res = this.findTab(item);
      // 删除当前节点，
      this.rmCrumbs(res.key);
      // 同时卸载实例
      res.example.ele.unmount();
      console.log(res.dom.classList);
      if(res.dom.classList.includes('micro-hide')){
        console.log('哈哈哈');
      }
      // 展示其他微服务
      removeDom(res.dom);
    },
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