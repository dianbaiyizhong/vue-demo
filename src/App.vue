<template>
  <div id="app">
    <!-- <ComponentChild v-model="content"></ComponentChild> -->

    <cron :dialogVisible="false" v-model="cronExpress" @cronChange="cronChange"></cron>
  </div>
</template>

<script>
// import ComponentChild from "./components/ComponentChild";

import cron from "./components/vue-cron/cron";
export default {
  name: "App",
  mounted() {
    let _this = this;
    setTimeout(() => {
      _this.cronExpress = "0 0 3 1 * ? *";
    }, 500);
  },
  data() {
    return {
      content: "hello",
      cronExpress: "0 0 2 1 * ? *",
      dialogVisible: false,
    };
  },
  methods: {
    cronChange(val) {
      console.info("aas" + val);
      this.cronExpress = val;
    },
  },
  components: {
    // ComponentChild,
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
