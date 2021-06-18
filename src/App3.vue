<template>
  <div class="parent">

    <div class="child">
      <codemirror v-model="code" :options="cmOptions" />
    </div>
    <div class="child">
      <codemirror v-model="code" :options="cmOptions" />
    </div>
    <div class="child">
      <codemirror v-model="code" :options="cmOptions" />
    </div>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import { codemirror } from "vue-codemirror";

export default {
  data() {
    return {
      code:
        "const a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\nconst a = 10\n",
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
      },
    };
  },
  components: {
    codemirror,
  },
};
</script>

<style>
.parent {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.child {
  flex: 1;
  display: flex;
}
.CodeMirror {
  height: 30vh;
}
</style>