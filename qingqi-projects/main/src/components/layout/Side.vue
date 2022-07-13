<!--
 * @Descripttion: 
 * @Author: yunfei
 * @Date: 2022-07-12 17:19:31
-->
<template>
  <Menu :theme="theme" width="auto">
    <MenuItem name="vue2" to="/vue2"
      ><div @click="loadApp('vue2', '//172.18.9.116:9000')">vue2</div></MenuItem
    >
    <MenuItem name="vue3" to="/vue3"
      ><div @click="loadApp('vue3', '//172.18.9.116:9001')">vue3</div></MenuItem
    >
  </Menu>
</template>
<script>
import { loadApp } from "../../utils/loadMicroApp.js";
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
  methods: {
    createDOM() {
      const container = document.createElement("div");
      container.classList.add("micro-item");
      container.setAttribute("micro-name", name);
      // 隐藏
      document.querySelector("#micro_container").childNodes.forEach((e) => {
        e.classList.add("micro-hide");
      });
      // append
      document.querySelector("#micro_container").appendChild(container);
      return container;
    },
    loadApp(name, url) {
      const container = this.createDOM();
      loadApp(
        { name, entry: url, container: container },
        { sandbox: { experimentalStyleIsolation: true } }
      )
        .then((app) => {
          this.micros.push(app);
        })
        .catch(() => {
          console.error("微服务创建失败！");
        });
    },
  },
};
</script>