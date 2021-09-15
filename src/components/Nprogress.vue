<template>
  <div class="a">
    <div class="a1">

    </div>
    <br>

    <div class="a2">

    </div>
  </div>

</template>

<script>
//vue中引用
import NProgress from "multi-nprogress/nprogress";
import "multi-nprogress/nprogress.css";
import Vue from "vue";

export default {
  mounted() {
    var instance = NProgress()

    instance.configure({ parent: ".a1", startOnInit: true });
    instance.set(0.4);
    console.info(instance);

    var instance2 = NProgress()
    instance2.configure({ parent: ".a2", startOnInit: true });
    instance2.set(0.4);
    console.info(instance2);
  },
};
</script>

<style>
.a1 {
  width: 500px;
  height: 200px;
}
.a2 {
  width: 500px;
  height: 200px;
}
</style>