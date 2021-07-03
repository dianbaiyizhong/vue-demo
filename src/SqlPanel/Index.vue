<template>
  <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" @tab-click="handleClick">
    <el-tab-pane :key="item.name" v-for="(item) in editableTabs" :label="item.title" :name="item.name">
      <component :ref="'panel_'+item.name" v-bind:is="currentEditorView"></component>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import Panel from "@/SqlPanel/Panel";
export default {
  name: "SqlPanel",
  components: { panel: Panel },
  data() {
    return {
      currentEditorView: "panel",
      editableTabsValue: "1",
      tabIndex: 1,
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content",
        },
      ],
    };
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },
    handleClick(tab, event) {

      this.$refs["panel_" + tab.name][0].getSql();
    },
  },
};
</script>

<style>
</style>