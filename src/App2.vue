<template>
  <div id="app">
    <vue-dropzone ref="vd" v-on:vdropzone-thumbnail="getThumb" v-on:vdropzone-success="dropSuccess" v-on:vdropzone-sending="sendingEvent" v-on:vdropzone-file-added="addFileEvent" id="dropzone" :options="dropzoneOptions" :useCustomSlot=true>
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
import axios from "axios";

export default {
  name: "App",
  mounted() {},
  data() {
    return {
      dropzoneOptions: {
        url: "http://localhost:2408/task/upload",
        thumbnailWidth: 200,
        thumbnailHeight: 200,
        maxFilesize: 1, // 单位：MB
        maxFiles: 1,
        addRemoveLinks: true,
        dictRemoveFile: "移除文件",
        dictFileTooBig:
          "文件大小过大 ({{filesize}}MiB). 最大限制: {{maxFilesize}}MiB.",
        autoProcessQueue: true,

        accept: function (file, done) {
          // done("输入错误信息")
          done();
        },
        // success: function (file, response) {
        //   console.info(file);
        //   // this.createThumbnailFromUrl(file, "/assets/Hadoop.svg");
        //  this.$refs.vd.emit("thumbnail", file, "./assets/Hadoop.svg");
        // },
      },
    };
  },
  methods: {
    sendingEvent(file, xhr, formData) {
      formData.append("paramName", "some value or other");
    },
    dropSuccess(file, response) {
      // console.info(this.$refs.vd);
      //  this.$refs.vd.$emit("thumbnail", file, "./assets/Hadoop.svg");
      // this.createThumbnailFromUrl(file, "/assets/Hadoop.svg");
    },
    getThumb(file, dataUrl) {
      console.info();
    },
    addFileEvent(file) {
      console.info(file.previewElement.querySelector("img"));
      file.previewElement.querySelector("img").src = "/Hadoop.svg";
      // let configs = {
      //   headers: { "Content-Type": "multipart/form-data" },
      // };
      // const data = new FormData();
      // data.append("file", file);
      // axios
      //   .post("http://localhost:2408/task/upload", data, configs)
      //   .then(function () {
      //     console.info("complete....");
      //   });
    },
  },
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

/* .vue-dropzone > .dz-preview .dz-details {
  bottom: 0;
  top: 0;
  color: white;
  background-color: rgba(33, 150, 243, 0.8);
  transition: opacity 0.2s linear;
  text-align: left;
} */
</style>
