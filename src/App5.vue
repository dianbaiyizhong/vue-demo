<template>
  <div>
    <!-- <input type="text" id="input-tags" class="demo-default" value="awesome,neat"> -->
    <input type="text" id="input-sortable" class="input-sortable demo-default" value="drag,these,items,around,1,2,3,4,5,6,7,8,9,10">
  </div>
</template>

<script>
import "@selectize/selectize/dist/css/selectize.css"
import "@selectize/selectize/dist/js/standalone/selectize"

import jQuery from "jquery"
import $ from "jquery"
import "jquery-ui-dist/jquery-ui"
export default {
  name: "VueDemoApp5",

  data() {
    return {}
  },

  mounted() {
    // $("#input-tags").selectize({
    //   delimiter: ",",
    //   persist: false,
    //   create: function (input) {
    //     return {
    //       value: input,
    //       text: input,
    //     }
    //   },
    // })

    $(".input-sortable").selectize({
      plugins: ["drag_drop", "remove_button", "restore_on_backspace"],
      persist: false,
      create: true,
    })
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
</style>