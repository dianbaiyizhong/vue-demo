<template>
  <div id="app">
    <!-- <ComponentChild v-model="content"></ComponentChild> -->

    <cron
      :cronDisable="cronDisable"
      v-model="cronExpress"
      @cronChange="cronChange"
    ></cron>
    <el-button type="primary" @click="submitForm">提交表单</el-button>
    <el-button type="primary" @click="ban">禁止使用</el-button>
  </div>
</template>

<script>
// import ComponentChild from "./components/ComponentChild";

import cron from "./components/vue-cron/cron";
export default {
  name: "App",
  mounted() {
    let _this = this;
    _this.cronExpress = "0 0 3 1 * ? *";

    setTimeout(() => {
      _this.cronExpress = "0 0 3 2 * ? *";
    }, 500);
  },
  data() {
    return {
      cronExpress: "",
      cronDisable: false,
    };
  },
  methods: {
    ban() {
      this.cronDisable = !this.cronDisable;
    },
    submitForm() {
      alert(this.cronExpress);
    },
    cronChange(val) {
      console.info("cronChange:" + val);
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
