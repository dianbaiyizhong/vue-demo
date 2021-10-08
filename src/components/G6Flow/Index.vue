<template>
  <div class="container">
    <!-- <ContextMenu></ContextMenu> -->
    <header>
      <Toolbar></Toolbar>
    </header>
    <main class="container__main">
      <splitpanes class="default-theme" style="width: 100vw">
        <pane size="20">
          <NodeMenu></NodeMenu>
        </pane>
        <pane class="editPanel">
          <EditorPanel
            :height="height"
            :width="width"
            :data="data"
          ></EditorPanel>
        </pane>
        <pane size="20">
          <Flow />
          <DetailPanel ref="detailPanel"></DetailPanel>
        </pane>
      </splitpanes>
    </main>
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
// import ContextMenu from "./G6Editor/ContextMenu";

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

    // var MyComponent = Vue.extend(ContextMenu)
  },
};
</script>
<style scoped>
/* .container {
  position: absolute;
} */
.container {
  display: flex;
  flex-direction: column;
}

.container__main {
  /* Take the remaining height */
  flex-grow: 1;

  /* Layout the left sidebar, main content and right sidebar */
  display: flex;
  flex-direction: row;
}

.container__left {
  width: 25%;
}

.container__middle {
  /* Take the remaining width */
  flex-grow: 1;
}

.container__right {
  width: 20%;
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
  height: calc(100vh - 42px);

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