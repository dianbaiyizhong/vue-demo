<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";

import dataBloodNode from "./dataBloodNodeCard";

export default {
  mounted() {
    let that = this;
    dataBloodNode.init();
    const data = {
      nodes: [
        {
          id: "0",
          label: "emp_ph",
          type: "card-node",
          nodeType: 1,
          column: ["name", "sex", "address"],
        },
        {
          id: "1",
          label: "1",
          nodeType: "2",
          type: "card-node",
          column: ["id", "sex"],
        },
        {
          id: "2",
          label: "2",
          type: "card-node",
        },
        {
          id: "3",
          label: "3",
          type: "card-node",
        },
        {
          id: "4",
          label: "4",
          type: "card-node",
        },
        {
          id: "5",
          label: "5",
          type: "card-node",
        },
        {
          id: "6",
          label: "6",
          type: "card-node",
        },
        {
          id: "7",
          label: "7",
          type: "card-node",
        },
        {
          id: "8",
          label: "8",
          type: "card-node",
        },
      ],
      edges: [
        {
          source: "0",
          target: "1",
        },
        {
          source: "0",
          target: "2",
        },
        {
          source: "0",
          target: "3",
        },
        {
          source: "0",
          target: "4",
        },
        {
          source: "0",
          target: "5",
        },
        {
          source: "1",
          target: "7",
        },
        {
          source: "2",
          target: "3",
        },
        {
          source: "1",
          target: "5",
        },
        {
          source: "1",
          target: "6",
        },
        {
          source: "1",
          target: "8",
        },
      ],
    };

    const container = document.getElementById("container");
    const width = container.scrollWidth;
    const height = container.scrollHeight;
    const graph = new G6.Graph({
      container: "container",
      width,
      height,
      fitView: true,
      modes: {
        default: ["zoom-canvas", "drag-canvas", "drag-node"],
      },
      maxZoom: 1,
      layout: {
        type: "dagre",
        rankdir: "LR",
        align: "DL",
        nodesepFunc: () => 30,
        ranksepFunc: () => 100,
      },

      defaultNode: {
        size: [30, 20],
        type: "rect",

        style: {
          lineWidth: 2,
          stroke: "#5B8FF9",
          fill: "#C6E5FF",
        },
      },
      defaultEdge: {
        size: 1,
        color: "#e2e2e2",
        type: "cubic-horizontal",
        style: {
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z",
            fill: "#e2e2e2",
          },
        },
      },
    });

    graph.data(data);
    graph.render();

    setTimeout(function () {
      graph.setMaxZoom(10);
    }, 1000);

    graph.on("node:mouseenter", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "hover", true);
    });

    graph.on("node:mouseenter", function (evt) {
      const item = evt.item;
      graph.setItemState(item, "hover", true);
    });

    graph.on("node:mouseleave", function (evt) {
      const item = evt.item;
      graph.setItemState(item, "hover", false);
    });
  },
};
</script>

<style>
#container {
  width: 1920px;
  height: 1080px;
}
</style>