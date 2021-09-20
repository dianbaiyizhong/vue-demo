<template>
  <div class="container">
    <Toolbar></Toolbar>
    <splitpanes class="default-theme" style="height:100vh;width:100vw;margin-top:50px">
      <pane size="20">
        <NodeMenu></NodeMenu>
      </pane>
      <pane>
        <EditorPanel :height="height" :width="width" :data="data"></EditorPanel>
      </pane>
      <pane size="20">
        <Flow />
        <DetailPanel></DetailPanel>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import NodeMenu from "./G6Editor/NodeMenu.vue";
import EditorPanel from "./G6Editor/EditorPanel";
import DetailPanel from "./G6Editor/DetailPanel";

import Editor from "./G6Editor/base/Editor";
import command from "./G6Editor/command";

import Flow from "./G6Editor/Flow";
import Toolbar from "./G6Editor/Toolbar";


export default {
  components: {
    Splitpanes,
    Pane,
    NodeMenu,
    EditorPanel,
    Flow,
    DetailPanel,
    Toolbar,
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight,
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      editor: {},
      command: null,
    };
  },
  created() {
    this.editor = new Editor();
    this.command = new command(this.editor);
  },
};
</script>
<style scoped>
.container {
  position: absolute;
}
</style>
<style  lang="scss">
.splitpanes {
  display: flex;
  width: 100%;
  height: 100%;

  &--vertical {
    flex-direction: row;
  }
  &--horizontal {
    flex-direction: column;
  }
  &--dragging * {
    user-select: none;
  }

  &__pane {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .splitpanes--vertical & {
      transition: width 0.2s ease-out;
    }
    .splitpanes--horizontal & {
      transition: height 0.2s ease-out;
    }
    .splitpanes--dragging & {
      transition: none;
    }
  }

  // Disable default zoom behavior on touch device when double tapping splitter.
  &__splitter {
    touch-action: none;
  }
  &--vertical > .splitpanes__splitter {
    min-width: 1px;
    cursor: col-resize;
  }
  &--horizontal > .splitpanes__splitter {
    min-height: 1px;
    cursor: row-resize;
  }
}
.splitpanes.default-theme {
  .splitpanes__pane {
    background-color: #fff;
  }
  .splitpanes__splitter {
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(0, 0, 0, 0.15);
      transition: background-color 0.3s;
    }
    &:hover:before,
    &:hover:after {
      background-color: rgba(0, 0, 0, 0.25);
    }
    &:first-child {
      cursor: auto;
    }
  }
}
.default-theme {
  &.splitpanes .splitpanes .splitpanes__splitter {
    z-index: 1;
  }
  &.splitpanes--vertical > .splitpanes__splitter,
  .splitpanes--vertical > .splitpanes__splitter {
    width: 7px;
    border-left: 1px solid #eee;
    margin-left: -1px;
    &:before,
    &:after {
      transform: translateY(-50%);
      width: 1px;
      height: 30px;
    }
    &:before {
      margin-left: -2px;
    }
    &:after {
      margin-left: 1px;
    }
  }
  &.splitpanes--horizontal > .splitpanes__splitter,
  .splitpanes--horizontal > .splitpanes__splitter {
    height: 7px;
    border-top: 1px solid #eee;
    margin-top: -1px;
    &:before,
    &:after {
      transform: translateX(-50%);
      width: 30px;
      height: 1px;
    }
    &:before {
      margin-top: -2px;
    }
    &:after {
      margin-top: 1px;
    }
  }
}
</style>