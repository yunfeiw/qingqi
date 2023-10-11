<!--
 * @Descripttion: 
 * @Author: 
 * @Date: 
-->

<template>
  <Tabs :animated="false" @on-click="tabhandle">
    <TabPane label="标签1" name="tab1">
      <tab1 :COLLECT_TYPE="COLLECT_TYPE" ref="tab1Ele" />
    </TabPane>
    <TabPane label="标题2" name="tab2">
      <tab2 :COLLECT_TYPE="COLLECT_TYPE" ref="tab2Ele" />
    </TabPane>
  </Tabs>
</template>

<script>
import { getCommonDict } from "@/misc/root-common";
// 明细
import Tab1 from "./tab1";
// 统计
import Tab2 from "./tab2";
export default {
  components: { Tab1, Tab2 },
  data() {
    return {
      ORGS: [],
      COLLECT_TYPE: [],
    };
  },
  methods: {
    // 切换
    tabhandle(v) {
      if (v == "tab1") {
        this.$nextTick(() => {
          this.$refs.tab1Ele.dataTableShow();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.tab2Ele.dataTableShow();
        });
      }
    },
  },
  mounted() {
    // 字典
    getCommonDict(
      {
        codeArray: "COLLECT_TYPE",
      },
      (data) => {
        this.COLLECT_TYPE = data.COLLECT_TYPE;
      }
    );
    // 集团
    this.$api.xxxxx.zzzzz().then((res) => {
      const { data, result } = res.data;
      if (result == "success") {
        this.ORGS = data;
      }
    });
  },
};
</script>

<style></style>
