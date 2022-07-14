<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-12 17:19:31
-->
<template>
  <Menu :theme="theme" width="auto">
    <MenuItem name="vue2" to="/vue2"
      ><div @click="loadApp('vue2', '//172.18.9.116:9000', '1')">
        vue2
      </div></MenuItem
    >
    <MenuItem name="vue3" to="/vue3"
      ><div @click="loadApp('vue3', '//172.18.9.116:9001', '2')">
        vue3
      </div></MenuItem
    >
  </Menu>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { loadApp } from "../../utils/loadMicroApp.js";

import { hideMicro, createDOM } from "@/micro/dom";
export default {
  data() {
    return {
      micros: [],
    };
  },
  props: {
    theme: {
      default: "light",
    },
  },
  computed: {
    ...mapState({
      crumbs: (state) => state.crumbs,
    }),
  },
  methods: {
    ...mapActions(["addCrumbs"]),

    /**
     * @descript 校验是否存在
     * */
    validateTab(data) {
      let { crumbs } = this.crumbs;
      let dom = null;
      let res = crumbs.some((e) => {
        if (e.key == data.key) {
          dom = e.dom;
          return true;
        } else {
          false;
        }
      });
      return { res, dom };
    },

    loadApp(name, url, key) {
      // 校验 是否 创建容器
      let { res, dom } = this.validateTab({ name, url, key });
      if (res) {
        // 隐藏 其他 服务
        hideMicro();
        // 展示
        dom && dom.classList.remove("micro-hide");
        return;
      }

      // 创建容器
      const container = createDOM(name);

      // 面包屑
      let example = {};
      this.addCrumbs({ name, key, dom: container, example });

      // 创建微服务
      loadApp(
        { name, entry: url, container: container },
        { sandbox: { experimentalStyleIsolation: true } }
      )
        .then((app) => {
          // 保存实例
          example.ele = app;
          this.micros.push(app);
        })
        .catch(() => {
          console.error("微服务创建失败！");
        });
    },
  },
};
</script>