<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-12 17:19:31
-->
<template>
  <Menu :theme="theme" width="auto">
    <MenuItem v-for="item in menus" :name="item.key" :key="item.key">
      <div @click="loadApp(item.name, item.url, item.key)">
        {{ item.name }}
      </div>
    </MenuItem>
  </Menu>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { loadApp } from "../../utils/loadMicroApp.js";

import { hideMicro, createDOM } from "@/micro/dom";
export default {
  data() {
    return {
      menus: [
        {
          name: "vue2",
          route: "/vue2",
          url: "//172.18.9.116:9000",
          key: 2,
        },
        {
          name: "vue3",
          route: "/vue3",
          url: "//172.18.9.116:9001",
          key: 3,
        },
      ],
      menuMap: {},
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
     * @descript 映射
     */
    arrToMap(arr) {
      arr.forEach((item) => {
        this.menuMap[item.key] = item;
      });
    },
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
    // 解析 当前路径  -map-> 菜单 -> 创建
  },
  mounted() {
    // 映射
    this.arrToMap(this.menus);
  },
};
</script>