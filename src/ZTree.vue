<template>
  <ul id="tree" class="ztree"></ul>
</template>

<script>
import $ from "jquery";
import "ztree";
import "ztree/css/metroStyle/metroStyle.css";
import axios from "axios";

export default {
  data() {
    return {
      zTree: null,
      nodeData: [
        {
          name: "父节点1",
          children: [{ name: "子节点1" }, { name: "子节点2" }],
        },
      ],
      setting: {
        view: {
          showLine: false,
        },
        edit: {
          enable: true,
        },
        data: {
          simpleData: {
            enable: true,
          },
        },
        callback: {
          onClick: this.loadNode,
          beforeEditName: this.editName,
          onRename: this.zTreeOnRename,
          beforeRename: this.zTreeBeforeRename,
          onExpand: this.zTreeOnExpand,
        },
      },
    };
  },
  methods: {
    zTreeOnExpand(event, treeId, treeNode) {
      alert(treeNode.tId + ", " + treeNode.name);
    },
    loadNode(event, treeId, treeNode) {
      console.info(event + "______" + treeId + "_____" + treeNode);
    },
    zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
      return false;
    },
    zTreeOnRename: function (event, treeId, treeNode, isCancel) {
      event.stopImmediatePropagation();
      return true;
    },
    editName: function () {
      return true;
    },
  },
  mounted() {
    let that = this;
    let nodeData = this.nodeData;
    $.fn.zTree.init($("#tree"), this.setting, []);
    this.zTree = $.fn.zTree.getZTreeObj("tree");

    axios.get("/mock/getList/0").then(function (data) {
      console.info(nodeData);
      that.zTree.addNodes(null, data.data.data);
    });
  },
};
</script>

<style>
</style>