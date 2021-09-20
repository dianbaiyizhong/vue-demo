<template>
  <div :id="pageId" class="graph-container" style="position: relative;"></div>
</template>

<script>
import G6 from "@antv/g6";
import { initBehavors } from "./behavior";
import axios from "axios";

export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null,
    };
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    initBehavors();
  },
  mounted() {
    let that = this;
    // setTimeout(function () {
    //   that.init();
    // }, 1000);
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const height = this.height - 42;
      const width = this.width - 400;

      // const tooltip = new G6.Tooltip({
      //   offsetX: 10,
      //   offsetY: 20,
      //   // 允许出现 tooltip 的 item 类型
      //   itemTypes: ["node"],
      //   // 自定义 tooltip 内容
      //   getContent(e) {
      //     const outDiv = document.createElement("div");
      //     outDiv.style.width = "fit-content";
      //     outDiv.innerHTML = `
      // <ul>
      // ${e.item._cfg.model.label}
      //  </ul>
      //  <ul>
      // </ul>`;
      //     return outDiv;
      //   },
      // });

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        // plugins: [tooltip], // 配置 Tooltip 插件
        modes: {
          // 支持的 behavior
          default: [
            "drag-canvas",
            "zoom-canvas",
            "hover-node",
            "select-node",
            "hover-edge",
            "keyboard",
            "customer-events",
            "add-menu",
            "drag-node",
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          // moveNode: ["drag-item"],
        },
      });

      this.graph.on("drop", (e) => {
        console.info("___________________");
      });

      this.graph.edge(() => {
        return {
          type: "customEdge",
        };
      });

      const { editor, command } = this.$parent.$parent.$parent;

      editor.emit("afterAddPage", { graph: this.graph, command });

      this.readData();
    },
    readData() {
      let that = this;
      // 根据网络请求得到数据
      axios.get("/mock/getFlowJson").then(function (resp) {
        that.graph.read(resp.data.data);
      });
    },
  },
};
</script>

<style>
</style>