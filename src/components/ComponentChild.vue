<template>
  <div>
    <el-tag>标签一</el-tag>

    <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  props: ["inputValue"],
};
</script>

<style>
</style>