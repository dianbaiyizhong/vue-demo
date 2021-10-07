<template>
  <div class="container">
    <main class="container__main">
      <el-input v-model="data01"></el-input>
    </main>
    <footer class="container__footer">
      <Minimap></Minimap>
    </footer>
  </div>
</template>

<script>
import eventBus from "./utils/eventBus";
import Minimap from "./Minimap";

export default {
  components: {
    Minimap,
  },
  data() {
    return {
      data01: "sssss",
    };
  },
  methods: {
    setData() {
      this.data01 = "sssssssssss___"
    },
  },
  created() {
    eventBus.$on("afterAddPage", (page) => {
      self.page = page;
      self.graph = self.page.graph;
      eventBus.$on("nodeselectchange", (item) => {
        if (item.select === true && item.target.getType() === "node") {
          self.status = "node-selected";
          self.item = item.target;
          self.node = item.target.getModel();
        } else {
          self.status = "canvas-selected";
          self.item = null;
          self.node = null;
        }
      });
    });
  },
};
</script>

<style  scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 80%;
}

.container__header,
.container__footer {
  flex-shrink: 0;
}

.container__main {
  flex-grow: 1;
}
</style>

