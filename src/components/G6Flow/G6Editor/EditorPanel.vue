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

      const tooltip = new G6.Tooltip({
        offsetX: 0,
        offsetY: 0,
        // 允许出现 tooltip 的 item 类型
        itemTypes: ["node"],
        // 自定义 tooltip 内容
        getContent(e) {
          const outDiv = document.createElement("div");
          outDiv.style.width = "fit-content";
          outDiv.innerHTML = `
      <ul>
      ${e.item._cfg.model.label}
       </ul>
       <ul>
      </ul>`;
          return outDiv;
        },
      });

      let that = this;

      const contextMenu = new G6.Menu({
        getContent(evt) {
          let item = evt.item._cfg;
          if (item.type == "edge") {
            let source_resource_type =
              item.sourceNode._cfg.model.resource_type || "";
            let target_resource_type =
              item.targetNode._cfg.model.resource_type || "";
            if (source_resource_type == "" || target_resource_type == "") {
              // 线上的点存在是拓扑树节点 此时没有关系选择
              return `
              <ul>
                  <li code='remove'>删除</li>
              </ul>`;
            } else {
              that.editEdge = {
                resourceId: item.model.source,
                resourceTypeId: source_resource_type,
                targetId: item.model.target,
                targetTypeId: target_resource_type,
              };
              return `
              <ul>
                  <li code='choose'>选择关系</li>
                  <li code='remove'>删除</li>
              </ul>`;
            }
          } else {
            return `
            <ul>
                <li code='edit'>编辑</li>
                <li code='remove'>删除</li>
            </ul>`;
          }
        },
        shouldBegin: (e) => {
          return true;
        },
        handleMenuClick: (target, item) => {},
        offsetX: -350,
        offsetY: -120,
        itemTypes: ["node", "edge"],
      });

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        plugins: [contextMenu], // 配置 Tooltip 插件
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
            "drag-combo",
            "collapse-expand-combo",
            "drag-node-with-combo",
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],

          // moveNode: ["drag-item"],
        },
        // groupType: "rect",
        groupByTypes: false,
      });

      this.graph.on("drop", (e) => {
        console.info("___________________");
      });

      this.graph.edge(() => {
        return {
          type: "customEdge",
        };
      });

      setTimeout(function () {
        // that.graph.updateLayout({
        //   type: "dagre",
        //   width: width,
        //   height: height,
        // });
      }, 3000);

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

    initMenu() {},
  },
};
</script>

<style>
</style>