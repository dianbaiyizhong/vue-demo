<template>
  <svg v-bind:class="[svgClass ,colorName , disableName]" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
 
<script>
export default {
  name: "SvgIcon",
  props: {
    disable: {
      type: Boolean,
      default: false,
    },

    iconColor: {
      type: String,
      default: "blue",
    },
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    disableName() {
      if (this.disable) {
        return "icon-disable";
      } else {
        return "icon-enable";
      }
    },
    colorName() {
      return "icon-color-" + this.iconColor;
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`,
      };
    },
  },
};
</script>
 
<style scoped>
.svg-icon {
  width: 16px;
  height: 16px;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}
.icon-color-blue {
  color: blue;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}

.icon-enable {
  color: blue;

  cursor: pointer;
}

.icon-disable {
  color: #808080;

  cursor: not-allowed;
}
</style>