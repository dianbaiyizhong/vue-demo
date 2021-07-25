<template>
  <div>
    <ul id="tree" class="ztree"></ul>

    <div id="area"></div>

  </div>
</template>

<script>
import $ from "jquery";
import "ztree";
import "ztree/css/metroStyle/metroStyle.css";
import axios from "axios";
import Vue from "vue";

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
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom,

          showLine: true,
        },
        edit: {
          enable: true,
          drag: {
            prev: this.prevTree,
            next: this.nextTree,
            inner: this.innerTree,
          },
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
          beforeDrag: this.dragTree2Dom,
          onDrop: this.dropTree2Dom,
          onDragMove: this.dragMove,
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
    dragMove: function (e, treeId, treeNodes) {},
    dragTree2Dom(treeId, treeNodes) {
      return !treeNodes[0].isParent;
    },
    prevTree(treeId, treeNodes, targetNode) {
      return false;
    },
    nextTree(treeId, treeNodes, targetNode) {
      console.info("nextTree");
      return false;
    },
    innerTree(treeId, treeNodes, targetNode) {
      console.info("innerTree");
      return false;
    },
    removeHoverDom(treeId, treeNode) {
      $("#" + treeNode.tId + "_add")
        .unbind()
        .remove();
    },
    addHoverDom(treeId, treeNode) {
      var aObj = $("#" + treeNode.tId + "_span");
      if (treeNode.editNameFlag || $("#" + treeNode.tId + "_add").length > 0)
        return;
      var addStr =
        "<span onfocus='this.blur();' treenode_add style title='添加' class='button add' id='" +
        treeNode.tId +
        "_add'" +
        "></span>";
      console.info(addStr);

      aObj.after(addStr);
      var btn = $("#" + treeNode.tId + "_add");
      if (btn)
        btn.bind("click", function () {
          alert("diy Button for " + treeNode.name);
        });
    },
    zTreeOnExpand(event, treeId, treeNode) {
      // zTree.reAsyncChildNodes(nodes[i], type, silent);

      // let node = this.zTree.getNodeByParam("id", treeNode.id, null);
      this.loadData(treeNode);
    },
    loadNode(event, treeId, treeNode) {
      console.info(event + "______" + treeId + "_____" + treeNode);
    },
    zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
      return true;
    },
    zTreeOnRename: function (event, treeId, treeNode, isCancel) {
      event.stopImmediatePropagation();
      return true;
    },
    editName: function () {
      return true;
    },

    loadData(clickNode) {
      let that = this;

      if (clickNode) {
        // 已经加载过的就别再加载了
        if (that.zTree.getNodeByParam("pid", clickNode.id)) {
          return;
        }

        axios.get("/mock/getList/" + clickNode.id).then(function (data) {
          that.zTree.addNodes(clickNode, data.data.data, true);
        });

        return;
      }

      axios.get("/mock/getList/root").then(function (data) {
        that.zTree.addNodes(null, data.data.data);
      });
    },
  },
  mounted() {
    let that = this;
    let nodeData = this.nodeData;
    $.fn.zTree.init($("#tree"), this.setting, []);
    this.zTree = $.fn.zTree.getZTreeObj("tree");

    // axios.get("/mock/getList/0").then(function (data) {
    //   console.info(nodeData);
    //   that.zTree.addNodes(null, data.data.data);
    // });
    that.loadData();

    // $("#area").bind("mousedown", MoveTest.bindMouseDown);
  },
};
</script>

<style>
#area {
  width: 500px;
  height: 500px;
  background-color: blue;
}
/* .ztree li span.button.pIcon01_ico_open {
  margin-top: 3px;

  background: url(1_open.png) no-repeat scroll 0 0 transparent;
  vertical-align: top;
  *vertical-align: middle;
}
.ztree li span.button.pIcon01_ico_close {
  margin-top: 3px;
  background: url(1_close.png) no-repeat scroll 0 0 transparent;
  vertical-align: top;
  *vertical-align: middle;
} */

.ztree li span.button.icon_model_ico_docu {
  margin-top: 3px;
  background: url(3d-modeling.png) no-repeat scroll 0 0 transparent;
  vertical-align: top;
  *vertical-align: middle;
}
</style>