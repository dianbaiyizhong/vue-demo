<template>
  <div>
    <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  model: {
    prop: "inputValue",
  },
  props: ["inputValue"],
};
</script>

<style>
</style>