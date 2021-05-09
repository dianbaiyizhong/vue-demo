<template>
  <div id="app">
    <!-- <ComponentChild :inputValue="content"></ComponentChild> -->

    <cron :dialogVisible="false" v-model="cronExpress"></cron>
  </div>
</template>

<script>
import ComponentChild from "./components/ComponentChild";

import cron from "./components/vue-cron/cron";
export default {
  name: "App",
  data() {
    return {
      content: "hello",
      cronExpress: "0 0 2 1 * ? *",
      dialogVisible: false,
    };
  },
  components: {
    ComponentChild,
    cron,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
