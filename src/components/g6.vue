<template>
  <div>
    <div class="demo">
      <div id="container"></div>

    </div>

  </div>

</template>

<script>
import G6 from "@antv/g6";
export default {
  components: {},
  data() {
    return {
      formData: {},
    };
  },

  mounted() {
    // 模拟数据
    const data = {
      nodes: [
        {
          x: 0,
          y: 0,
          label: "等级1",
          color: "#2196f3",
          meta: [
            { name: "任务1任务1任务1任务1任务1任务1", node: "zxj1.212" },
            { name: "任务2", node: "zxj1.212" },
            { name: "任务3", node: "zxj1.212" },
            { name: "任务4", node: "zxj1.212" },
            { name: "任务5", node: "zxj1.212" },
            { name: "任务6", node: "zxj1.212" },
            { name: "任务7", node: "zxj1.212" },
            { name: "任务8", node: "zxj1.212" },
            { name: "任务9", node: "zxj1.212" },
            { name: "任务10", node: "zxj1.212" },
            { name: "任务11", node: "zxj1.212" },
            { name: "任务12", node: "zxj1.212" },
            { name: "任务11", node: "zxj1.212" },
          ],
          id: "0",
        },
        {
          x: 0,
          y: 400,
          label: "等级1",
          color: "#2196f3",
          meta: [
            { name: "任务1任务1任务1任务1任务1任务1", node: "zxj1.212" },
            { name: "任务2", node: "zxj1.212" },
            { name: "任务3", node: "zxj1.212" },
            { name: "任务4", node: "zxj1.212" },
            { name: "任务5", node: "zxj1.212" },
            { name: "任务6", node: "zxj1.212" },
            { name: "任务7", node: "zxj1.212" },
            { name: "任务8", node: "zxj1.212" },
            { name: "任务9", node: "zxj1.212" },
            { name: "任务10", node: "zxj1.212" },
            { name: "任务11", node: "zxj1.212" },
            { name: "任务12", node: "zxj1.212" },
            { name: "任务11", node: "zxj1.212" },
          ],
          id: "1",
        },
        {
          x: 0,
          y: 800,
          label: "等级1",
          color: "#2196f3",
          meta: [
            { name: "任务1任务1任务1任务1任务1任务1", node: "zxj1.212" },
            { name: "任务2", node: "zxj1.212" },
            { name: "任务3", node: "zxj1.212" },
            { name: "任务4", node: "zxj1.212" },
            { name: "任务5", node: "zxj1.212" },
            { name: "任务6", node: "zxj1.212" },
            { name: "任务7", node: "zxj1.212" },
            { name: "任务8", node: "zxj1.212" },
            { name: "任务9", node: "zxj1.212" },
            { name: "任务10", node: "zxj1.212" },
            { name: "任务11", node: "zxj1.212" },
            { name: "任务12", node: "zxj1.212" },
            { name: "任务11", node: "zxj1.212" },
          ],
          id: "2",
        },
      ],
      edges: [
        {
          id: "edge0",
          source: "0",
          target: "1",
        },
        {
          id: "edge1",
          source: "1",
          target: "2",
        },
      ],
    };
    // 定义 Dom 节点
    G6.registerNode("dom-node-1", {
      draw: (cfg, group) => {
        const children = cfg.meta
          .map(
            (val) =>
              `<div style="flex: 1; border: 1px solid #2196f3; padding: 5px;margin:5px;font-size:12px;min-width:100px;max-width:200px">
        <p style="padding:0;margin:0;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">任务名称：${val.name}</p>
        <p style="padding:0;margin:0;">节点：${val.node}</p>
      </div>`
          )
          .join("");
        return group.addShape("dom", {
          attrs: {
            width: 500,
            height: 316,
            html: `
        <div style="border:1px solid #2196f3;border-radius:5px;">
        <div style="text-align:center;background:#2196f3;font-size:18px;color:#fff;font-weight:bold;">${cfg.label}</div>
        <div style="display:flex;padding:10px; flex-wrap:wrap;">
        ${children}
        </div>
        </div>
          `,
          },
          draggable: true,
        });
      },
      getAnchorPoints() {
        return [
          [0.5, 0],
          [0.5, 1],
        ];
      },
    });

    const width = 1000;
    const height = 1000;
    const graph = new G6.Graph({
      container: "container",
      width,
      height,
      modes: {
        default: ["zoom-canvas", "drag-canvas"],
      },
      renderer: "svg", // 使用 Dom node 的时候需要使用 svg 的渲染形势
      defaultNode: {
        type: "dom-node-1",
      },
      defaultEdge: {
        style: {
          endArrow: true,
          offset: 45,
          stroke: "#2196f3",
          lineWidth: 2,
        },
      },
      fitCenter: true,
    });

    graph.data(data);
    graph.render();
    graph.fitView();
  },
  created() {},
  methods: {
    reset() {},
  },
};
</script>

<style>
</style>