<template>
  <ul id="tree" class="ztree"></ul>
</template>

<script>
import $ from "jquery";
import "ztree";
import "ztree/css/metroStyle/metroStyle.css";
export default {
  data() {
    return {
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
          onClick: this.getFileDesc,
          beforeEditName: this.editName,
          onRename: this.zTreeOnRename,
          beforeRename: this.zTreeBeforeRename,
        },
      },
    };
  },
  methods: {
    zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
      return false;
    },
    zTreeOnRename: function (event, treeId, treeNode, isCancel) {
      console.info("ww");
      event.stopImmediatePropagation();
      return true;
    },
    editName: function () {
      return true;
    },
  },
  mounted() {
    let nodeData = this.nodeData;
    $.fn.zTree.init($("#tree"), this.setting, nodeData);
  },
};
</script>

<style>
</style>