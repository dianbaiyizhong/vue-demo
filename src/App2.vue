<template>
  <div id="app">
    <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot=true>
      <div style="width:100%;height:100%;position:relative;display: flex;justify-content: center;align-items: center;">
        <img style="position:absolute;left:0px;bottom:0px;" src="./assets/Hadoop.svg">
        <div class="dropzone-custom-content">
          <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
          <div class="subtitle">...or click to select a file from your computer</div>
        </div>
      </div>

    </vue-dropzone>
  </div>
</template>

<script>
// import ComponentChild from "./components/ComponentChild";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  name: "App",
  mounted() {},
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true,
      },
    };
  },
  methods: {},
  components: {
    vueDropzone: vue2Dropzone,
  },
};
</script>

<style>
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
  width: 800px;
  height: 300px;
  background: #f7f7f7;
  padding: 0;
}
.vue-dropzone:hover {
  background: #f1f1f1;
}
.dropzone .dz-message {
  width: 800px;
  height: 300px;
  margin: 0;
}
</style>
