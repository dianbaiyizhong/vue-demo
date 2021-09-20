<template>
  <div>
    <Minimap></Minimap>
  </div>
</template>

<script>
import eventBus from "./utils/eventBus";
import Minimap from "./Minimap";

export default {
  components: {
    Minimap,
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

<style>
</style>