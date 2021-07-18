<template>
  <div id="app">
    <!-- <ComponentChild v-model="content"></ComponentChild> -->
    <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot=true>
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
        <div class="subtitle">...or click to select a file from your computer</div>
      </div>
    </vue-dropzone>

    <cron :cronDisable="cronDisable" v-model="cronExpress" @cronChange="cronChange"></cron>
    <el-button type="primary" @click="submitForm">提交表单</el-button>
    <el-button type="primary" @click="ban">禁止使用</el-button>
  </div>
</template>

<script>
// import ComponentChild from "./components/ComponentChild";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
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
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true,
      },
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
    vueDropzone: vue2Dropzone,
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

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

.dropzone {
  border: 2px dashed #0087f7;
  border-radius: 5px;
  background: white;
}
</style>
