<template>

  <div id="app">
    <vue-dropzone @vdropzone-file-added="addFileEvent" @vdropzone-drop="dragOver" ref="vd" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true">
      <div style="
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        ">
        <img style="position: absolute; left: 0px; bottom: 0px" src="./assets/Hadoop.svg" />
        <div class="dropzone-custom-content">
          <span style="font-size:24px;color:#393939">
            <span class="dropzone-custom-title">
              <font-awesome-icon class="red" :icon="['fas','caret-right']" /> 拖拽jar文件
            </span> 上传
            <span class="subtitle">(或点击)</span> <br />
          </span>
          <i class="fa fa-cloud-upload-alt blue fa-3x"></i>
          <font-awesome-icon class="blue fa-4x" :icon="['fas','cloud-upload-alt']" />
        </div>
      </div>
    </vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Vue from "vue";
//https://fontawesome.com/v5.15/icons/caret-right?style=solid
import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCloudUploadAlt,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCloudUploadAlt);
library.add(faCaretRight);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import axios from "axios";

export default {
  name: "App",
  mounted() {},
  data() {
    return {
      dropzoneOptions: {
        url: "#",
        thumbnailWidth: 200,
        thumbnailHeight: 200,
        maxFilesize: 10000, //单位：MB
        maxFiles: 1,
        addRemoveLinks: true,
        dictRemoveFile: "移除文件",
        dictFileTooBig:
          "文件大小过大 ({{filesize}}MiB). 最大限制: {{maxFilesize}}MiB.",
        autoProcessQueue: false,
        accept: function (file, done) {
          done();
        },
      },
    };
  },
  methods: {
    dragOver() {
      // 上传之前清空队列
      this.$refs.vd.removeAllFiles();
    },
    addFileEvent(file) {
      let _this = this;
      // console.info(file.previewElement.querySelector("img"));
      file.previewElement.querySelector("img").src =
        "/jar-open-file-format.png";
      let configs = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          let persent =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0; //上传进度百分比
          let span = file.previewElement.querySelector(".dz-upload");
          span.style.width = persent + "%";
        },
      };
      const data = new FormData();
      data.append("file", file);
      axios
        .post("http://localhost:2408/task/upload", data, configs)
        .then(function (data) {
          // file.previewElement.classList.add("dz-error");

          // file.previewElement.querySelector(".dz-error-message span").innerHTML='错误了老弟';
          file.previewElement.classList.add("dz-success");
        })
        .catch(function () {
          file.previewElement.classList.add("dz-error");
        })
        .finally(function () {
          file.previewElement.classList.add("dz-complete");
        });
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
  font-weight: bolder;
  font-size: 36px;
  color: #555;
}

.subtitle {
  color: #777 !important;
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
/** */
.vue-dropzone > .dz-preview .dz-image img {
  width: 200px;
}
.vue-dropzone > .dz-preview .dz-details {
  background-color: rgba(255, 255, 255, 0);
}

.vue-dropzone .blue {
  color: #478fca !important;
  opacity: 0.7;
  margin-top: 8px;
}

.vue-dropzone .red {
  color: #dd5a43 !important;
}
</style>
