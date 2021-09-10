<template>
  <div>
    <div class="demo">

      <div style="width:500px;height:500px;color:#FFF000">

      </div>
    </div>

    <div class="demo2">
      <CustomInput disabled="false" v-model="formData.username"></CustomInput>
      <div>{{formData.username}}</div>
      <el-button @click="reset">默认按钮</el-button>
    </div>

    <div class="minimap">

    </div>
  </div>

</template>

<script>
import CustomInput from "@/components/CustomInput";
import jQuery from "jquery";
import $ from "jquery";

import minimap from "./minimap/minimap.min.js"; //注意路径

export default {
  components: {
    CustomInput,
  },
  data() {
    return {
      formData: {
        username: "sss",
      },
    };
  },

  mounted() {
    var previewBody = $(".minimap").minimap({
      heightRatio: 0.6,
      widthRatio: 0.05,
      offsetHeightRatio: 0.035,
      offsetWidthRatio: 0.035,
      position: "right",
      touch: true,
      smoothScroll: true,
      smoothScrollDelay: 200,
      onPreviewChange: function (minimap, scale) {},
      disableFind: false,
    });
    // console.info(previewBody);
    previewBody.show();
    // $(".minimap").appendTo(previewBody);
  },
  created() {},
  methods: {
    reset() {
      this.formData.username = "";
    },
  },
};
</script>

<style>
</style>