<template>
  <div>
    <ul id="tree" class="ztree"></ul>

  </div>
</template>

<script>
import $ from "jquery";
import "ztree";
import "ztree/css/metroStyle/metroStyle.css";
import axios from "axios";
import _ from "lodash";
import eventBus from "./utils/eventBus";

export default {
  data() {
    return {
      page: null,
      command: null,

      zTree: null,
      expandNodes: [],
      setting: {
        view: {
          showLine: true,
        },
        edit: {
          enable: true,
        },
        data: {
          simpleData: {
            enable: true,
          },
        },
        check: {
          enable: true,
          chkStyle: "radio",
          radioType: "level",
        },
        callback: {
          onDrop: this.dropTree2Dom,
        },
      },
    };
  },
  methods: {
    dropTree2Dom(e, treeId, treeNodes) {
      console.info(e.offsetX + "__" + e.offsetY);
      console.info(treeNodes);

      let data = {
        id: "3",
        nodeId: "3",
        modelName: "新增",
        x: e.offsetX,
        y: e.offsetY,
        type: "customNode",
      };
      this.command.executeCommand("addNode", [data]);
    },
    bindEvent() {
      eventBus.$on("afterAddPage", (page) => {
        this.page = page;
        this.command = page.command;
      });
    },
  },
  created() {
    this.bindEvent();
  },
  mounted() {
    let that = this;
    $.fn.zTree.init($("#tree"), this.setting, []);
    this.zTree = $.fn.zTree.getZTreeObj("tree");

    axios.get("/mock/getModel").then(function (data) {
      that.zTree.addNodes(null, data.data.data);
    });
  },
};
</script>

<style>
</style>