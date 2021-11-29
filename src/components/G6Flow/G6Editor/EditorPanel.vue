<template>
  <div :id="pageId" class="graph-container"></div>
</template>

<script>
import G6 from "@antv/g6";
import { initBehavors } from "./behavior";
import axios from "axios";
import eventBus from "./utils/eventBus";

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
      const width = this.width;
      const grid = new G6.Grid();

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
        offsetX: 0,
        offsetY: 0,
        itemTypes: ["node", "edge"],
      });

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        // enableStack: true,
        enabledStack: true,
        plugins: [contextMenu, grid], // 配置 Tooltip 插件
        defaultEdge: {
          type: "quadratic",
          style: {
            stroke: "#F6BD16",
            lineWidth: 2,
          },
        },
        layout: {
          type: "dagre",
          rankdir: "LR", // 可选，默认为图的中心
          align: "DL", // 可选
          nodesep: 40, // 可选
          ranksep: 100, // 可选
          controlPoints: true, // 可选
        },
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
            "drag-combo",
            "collapse-expand-combo",
            "drag-node-with-combo",
            "click-select",
            {
              type: "drag-node",
              // enableStack: true,
            },
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          // moveNode: ["drag-item"],
        },
        groupByTypes: true,
        defaultCombo: {
          type: "cRect",
          style: {
            fill: "#fff",
            opacity: 0.5,
          },
        },
      });

      // collapse/expand when click the marker
      this.graph.on("combo:click", (e) => {
        if (e.target.get("name") === "combo-marker-shape") {
          that.graph.collapseExpandCombo(e.item);
          if (that.graph.get("layout")) that.graph.layout();
          else that.graph.refreshPositions();
        }
      });

      this.graph.on("combo:dragend", (e) => {
        that.graph.getCombos().forEach((combo) => {
          that.graph.setItemState(combo, "dragenter", false);
        });
      });

      this.graph.on("node:dragend", (e) => {
        that.graph.getCombos().forEach((combo) => {
          that.graph.setItemState(combo, "dragenter", false);
        });
      });

      this.graph.on("combo:dragenter", (e) => {
        that.graph.setItemState(e.item, "dragenter", true);
      });
      this.graph.on("combo:dragleave", (e) => {
        that.graph.setItemState(e.item, "dragenter", false);
      });

      this.graph.on("combo:mouseenter", (evt) => {
        const { item } = evt;
        that.graph.setItemState(item, "active", true);
      });

      this.graph.on("combo:mouseleave", (evt) => {
        const { item } = evt;
        that.graph.setItemState(item, "active", false);
      });

      // 解决残影问题
      //  this.graph.get("canvas").set("localRefresh", false);

      this.graph.on("drop", (e) => {
        console.info("___________________drop");
        eventBus.$emit("drop", e);
      });

      this.graph.edge(() => {
        return {
          type: "customEdge",
        };
      });

      // setTimeout(function () {
      //   // 测试局部布局

      //   axios.get("/mock/getAnotherFlowJson").then(function (resp) {
      //     let g6Data = resp.data.data;

      //     g6Data.nodes.map((node) => {
      //       that.graph.addItem("node", node);
      //     });

      //     g6Data.edges.map((edge) => {
      //       that.graph.addItem("edge", edge);
      //     });

      //     const subForceLayout = new G6.Layout.dagre({
      //       // center: [500, 1000],
      //       linkDistance: 200,
      //       // preventOverlap: true,
      //       // tick: function tick() {
      //       //   that.graph.refreshPositions();
      //       // },
      //     });
      //     subForceLayout.init({
      //       nodes: g6Data.nodes,
      //       edges: g6Data.edges,
      //     });

      //     subForceLayout.execute();
      //     that.graph.refreshPositions();

      //     that.graph.createCombo(
      //       {
      //         id: "p2",
      //         label: "模型依赖分组",
      //       },
      //       ["n5", "n6", "n7", "n8"]
      //     );
      //   });
      // }, 3000);

      const { editor, command } = this.$parent.$parent.$parent;

      editor.emit("afterAddPage", { graph: this.graph, command });

      this.readData();
    },
    readData() {
      let that = this;
      // 根据网络请求得到数据
      axios.get("/mock/getFlowJson").then(function (resp) {
        that.graph.read(resp.data.data);

        // that.graph.clearStack();
        console.info(that.graph.getStackData());

        // 这是一个子组件，给另外的子组件赋值呢
        that.$parent.$parent.$parent.$refs.detailPanel.setData();
      });
    },

    initMenu() {},
  },
};
</script>


<style>
.graph-container {
  background-color: #f7f7fa;
}
canvas {
  position: relative;
}
.g6-grid-container {
  z-index: 0 !important;
}
.minimap {
  position: absolute;
  z-index: 10;
}
</style>