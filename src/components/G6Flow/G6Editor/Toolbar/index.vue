<template>
  <div class="toolbar">
    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css" />

    <svg-icon disable="true" iconClass="run" @click="handleUndo" />
    <svg-icon iconClass="undo" class="icon" :class="undoList.length > 1 ? '' : 'disable'" @click="handleUndo" />

    <i class="command iconfont icon-redo" title="重做" :class="redoList.length > 1 ? '' : 'disable'" @click="handleRedo"></i>
    <span class="separator"></span>
    <!-- <i data-command="copy" class="command iconfont icon-copy-o disable" title="复制"></i>
    <i data-command="paste" class="command iconfont icon-paster-o disable" title="粘贴"></i>-->
    <i data-command="delete" class="command iconfont icon-delete-o" title="删除" :class="selectedItem ? '' : 'disable'" @click="handleDelete"></i>
    <span class="separator"></span>
    <i data-command="zoomIn" class="command iconfont icon-zoom-in-o" title="放大" @click="handleZoomIn"></i>
    <i data-command="zoomOut" class="command iconfont icon-zoom-out-o" title="缩小" @click="handleZoomOut"></i>
    <i data-command="autoZoom" class="command iconfont icon-fit" title="适应画布" @click="handleAutoZoom"></i>
    <i data-command="resetZoom" class="command iconfont icon-actual-size-o" title="实际尺寸" @click="handleResetZoom"></i>
    <span class="separator"></span>
    <i data-command="toBack" class="command iconfont icon-to-back" :class="selectedItem ? '' : 'disable'" title="层级后置" @click="handleToBack"></i>
    <i data-command="toFront" class="command iconfont icon-to-front" :class="selectedItem ? '' : 'disable'" title="层级前置" @click="handleToFront"></i>
    <span class="separator"></span>
    <span class="separator"></span>
    <i data-command="multiSelect" class="command iconfont icon-select" :class="multiSelect ? 'disable' : ''" title="多选" @click="handleMuiltSelect"></i>
    <i data-command="addGroup" class="command iconfont icon-group" title="成组" :class="addGroup ? '' : 'disable'" @click="handleAddGroup"></i>

    <i data-command="unGroup" class="command iconfont icon-ungroup disable" title="解组"></i>
    <!-- <el-button @click="consoleData" type="primary">控制台输出数据</el-button> -->

    <!-- <el-button @click="comeOn" type="primary">动起来</el-button> -->
  </div>
</template>

<script>
import G6 from "@antv/g6";
import { clone, isString } from "@antv/util";

import eventBus from "../utils/eventBus";
import Util from "@antv/util";
import { uniqueId, getBox } from "../utils";

import "./icons";

export default {
  data() {
    return {
      page: {},
      graph: {},
      redoList: [],
      undoList: [],
      editor: null,
      command: null,
      selectedItem: null,
      multiSelect: false,
      addGroup: false,
      isHasUndo: false,
    };
  },
  created() {
    this.init();
    this.bindEvent();
  },
  watch: {
    selectedItem(val) {
      if (val && val.length > 1) {
        this.addGroup = true;
      } else {
        this.addGroup = false;
      }
    },
  },
  methods: {
    init() {
      const { editor, command } = this.$parent;
      this.editor = editor;
      this.command = command;
    },
    bindEvent() {
      let self = this;
      eventBus.$on("drop", (data) => {
        self.isHasUndo = true;
        this.redoList = self.graph.getStackData().redoStack;
        this.undoList = self.graph.getStackData().undoStack;

        console.info(self.graph.getStackData());
      });
      eventBus.$on("afterAddPage", (page) => {
        self.page = page;
        self.graph = self.page.graph;
      });
      eventBus.$on("add", (data) => {
        this.redoList = data.redoList;
        this.undoList = data.undoList;
      });
      eventBus.$on("update", (data) => {
        this.redoList = data.redoList;
        this.undoList = data.undoList;
      });
      eventBus.$on("delete", (data) => {
        this.redoList = data.redoList;
        this.undoList = data.undoList;
      });
      eventBus.$on("updateItem", (item) => {
        this.command.executeCommand("update", [item]);
      });
      eventBus.$on("addItem", (item) => {
        this.command.executeCommand("add", [item]);
      });
      // eventBus.$on("addLink", (item) => {
      //   // this.command.executeCommand("addLink", [item]);
      //   this.command.executeCommand("add", [item]);
      // });
      eventBus.$on("nodeselectchange", () => {
        this.selectedItem = this.graph.findAllByState("node", "selected");
        this.selectedItem = this.selectedItem.concat(
          ...this.graph.findAllByState("edge", "selected")
        );
      });
      eventBus.$on("deleteItem", () => {
        this.handleDelete();
      });
      eventBus.$on("muliteSelectEnd", () => {
        this.multiSelect = false;
        this.selectedItem = this.graph.findAllByState("node", "selected");
      });
    },

    start() {
      const item = this.graph.findById("1");

      console.info(item);
      this.graph.updateItem(item, {
        label: "sddddd",
      });
    },
    handleUndo() {
      let graph = this.graph;

      const undoStack = this.graph.getUndoStack();

      // if (!undoStack || undoStack.length === 1) {
      //   return;
      // }

      const currentData = undoStack.pop();
      if (currentData) {
        const { action } = currentData;
        graph.pushStack(action, clone(currentData.data), "redo");
        let data = currentData.data.before;

        if (action === "add") {
          data = currentData.data.after;
        }

        if (!data) return;

        switch (action) {
          case "visible": {
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                const item = graph.findById(model.id);
                if (model.visible) {
                  graph.showItem(item, false);
                } else {
                  graph.hideItem(item, false);
                }
              });
            });
            break;
          }
          case "render":
          case "update":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                graph.updateItem(model.id, model, false);
              });
            });
            break;
          case "changedata":
            graph.changeData(data, false);
            break;
          case "delete": {
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                const itemType = model.itemType;
                delete model.itemType;
                graph.addItem(itemType, model, false);
              });
            });
            break;
          }
          case "add":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                graph.removeItem(model.id, false);
              });
            });
            break;
          case "updateComboTree":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                graph.updateComboTree(model.id, model.parentId, false);
              });
            });
            break;
          default:
        }
      }
      this.undoList = graph.getStackData().undoStack;

      console.info(graph.getStackData());
    },
    handleRedo() {
      let graph = this.graph;
      const redoStack = graph.getRedoStack();

      if (!redoStack || redoStack.length === 0) {
        return;
      }

      const currentData = redoStack.pop();
      if (currentData) {
        const { action } = currentData;
        let data = currentData.data.after;
        graph.pushStack(action, clone(currentData.data));
        if (action === "delete") {
          data = currentData.data.before;
        }

        if (!data) return;

        switch (action) {
          case "visible": {
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                const item = graph.findById(model.id);
                if (model.visible) {
                  graph.showItem(item, false);
                } else {
                  graph.hideItem(item, false);
                }
              });
            });
            break;
          }
          case "render":
          case "update":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                graph.updateItem(model.id, model, false);
              });
            });
            break;
          case "changedata":
            graph.changeData(data, false);
            break;
          case "delete":
            if (data.edges) {
              data.edges.forEach((model) => {
                graph.removeItem(model.id, false);
              });
            }
            if (data.nodes) {
              data.nodes.forEach((model) => {
                graph.removeItem(model.id, false);
              });
            }
            if (data.combos) {
              data.combos.forEach((model) => {
                graph.removeItem(model.id, false);
              });
            }
            break;
          case "add": {
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                const itemType = model.itemType;
                delete model.itemType;
                graph.addItem(itemType, model, false);
              });
            });
            break;
          }
          case "updateComboTree":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                graph.updateComboTree(model.id, model.parentId, false);
              });
            });
            break;
          default:
        }
      }
    },
    handleDelete() {
      if (this.selectedItem.length > 0) {
        this.command.executeCommand("delete", this.selectedItem);
        this.selectedItem = null;
      }
    },
    getFormatPadding() {
      // return Util.formatPadding(this.graph.get("fitViewPadding"));
    },
    getViewCenter() {
      const padding = this.getFormatPadding();
      const graph = this.graph;
      const width = this.graph.get("width");
      const height = graph.get("height");
      return {
        x: (width - padding[2] - padding[3]) / 2 + padding[3],
        y: (height - padding[0] - padding[2]) / 2 + padding[0],
      };
    },
    handleZoomIn() {
      const currentZoom = this.graph.getZoom();
      this.graph.zoomTo(currentZoom + 0.5, this.getViewCenter());
    },
    handleZoomOut() {
      const currentZoom = this.graph.getZoom();
      this.graph.zoomTo(currentZoom - 0.5, this.getViewCenter());
    },
    handleToBack() {
      if (this.selectedItem && this.selectedItem.length > 0) {
        this.selectedItem.forEach((item) => {
          item.toBack();
          this.graph.paint();
        });
      }
    },
    handleToFront() {
      if (this.selectedItem && this.selectedItem.length > 0) {
        this.selectedItem.forEach((item) => {
          if (item.getType() === "edge") {
            // const nodeGroup = this.graph.get("nodeGroup");
            // const edgeGroup = item.get("group");
            // nodeGroup.toFront();
            // edgeGroup.toFront()
          } else {
            item.toFront();
          }

          this.graph.paint();
        });
      }
    },
    handleAutoZoom() {
      this.graph.fitView(20);
    },
    handleResetZoom() {
      this.graph.zoomTo(1, this.getViewCenter());
    },
    handleMuiltSelect() {
      this.multiSelect = true;
      this.graph.setMode("mulitSelect");
    },
    handleAddGroup() {
      //TODO 这部分等阿里更新Group之后添加
      // const model = {
      //   id: "group" + uniqueId(),
      //   title: "新建分组"
      // };
      // // this.command.executeCommand("add", "group", model);
      // this.selectedItem.forEach(item => {
      //   console.log(item);
      // });
      //this.getPosition(this.selectedItem);
    },
    getPosition(items) {
      const boxList = [];
      items.forEach((item) => {
        const box = item.getBBox();
        boxList.push(getBox(box.x, box.y, box.width, box.height));
      });
      let minX1, minY1, MaxX2, MaxY2;
      boxList.forEach((box) => {
        if (typeof minX1 == "undefined") {
          minX1 = box.x1;
        }
        if (typeof minY1 == "undefined") {
          minY1 = box.y1;
        }
        if (typeof MaxX2 == "undefined") {
          MaxX2 = box.x2;
        }
        if (typeof MaxY2 == "undefined") {
          MaxY2 = box.y2;
        }
        if (minX1 > box.x1) {
          minX1 = box.x1;
        }
        if (minY1 > box.y1) {
          minY1 = box.y1;
        }
        if (MaxX2 < box.x2) {
          MaxX2 = box.x2;
        }
        if (MaxY2 < box.y2) {
          MaxY2 = box.y2;
        }
      });
      const width = MaxX2 - minX1,
        height = MaxY2 - minY1,
        x = minX1 + width / 2,
        y = minY1 + height / 2,
        id = "team" + uniqueId();
      const model = {
        id: id,
        width,
        height,
        x,
        y,
        shape: "teamNode",
      };
      this.command.executeCommand("add", model);
      // const item = this.graph.findById(id);
      // item.get("group").toBack();
      // const edgeGroup = this.graph.get("edgeGroup");
      // edgeGroup.toFront();
      // this.graph.paint();
    },

    consoleData() {
      console.log(this.graph.save());
    },

    comeOn() {},
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  .command:nth-of-type(1) {
    margin-left: 0px;
  }
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #e9e9e9;
  height: 42px;
  box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
  display: flex;
  align-items: center;
  .command {
    box-sizing: border-box;
    width: 27px;
    height: 27px;
    margin: 0px 6px;
    border-radius: 2px;
    padding-left: 4px;
    border: 1px solid rgba(2, 2, 2, 0);
  }
  .command:hover {
    cursor: pointer;
    border: 1px solid #e9e9e9;
  }

  .icon {
    box-sizing: border-box;
    width: 27px;
    height: 27px;
    margin: 0px 6px;
    padding-left: 2px;
    padding-right: 2px;

    border-radius: 2px;
    border: 1px solid rgba(2, 2, 2, 0);
  }
  .icon:hover {
    cursor: pointer;
    border: 1px solid #e9e9e9;
  }

  .icon_run {
    background: url("./assets/run.svg") center no-repeat;
    background-size: 16px 16px;
  }
  .separator {
    height: 70%;
    border-left: 1px solid #e9e9e9;
  }
  .disable {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>

