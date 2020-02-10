<template>
  <div>
    <div @click="deleteLayerColor" class="color" :style="style">
      &nbsp;
    </div>
  </div>
</template>

<script>
import tinycolor from "tinycolor2";
export default {
  methods: {
    deleteLayerColor() {
      console.log();
      this.$store.dispatch("sceneConfig/deleteLayerColor", {
        layerUuid: this.layerUuid,
        colorUuid: this.color.uuid
      });
    }
  },
  computed: {
    style() {
      const c1 = tinycolor(this.color.base)
        .darken(Math.abs(this.color.min))
        .toString();
      const c2 = tinycolor(this.color.base)
        .lighten(this.color.max)
        .toString();
      return {
        background: `linear-gradient(0deg, ${c1}, ${c2})`
      };
    }
  },
  props: {
    colorList: {
      type: Array,
      default: () => []
    },
    layerUuid: {
      type: String,
      default: null
    },
    color: {
      type: Object,
      default: () => {}
    }
    // min: {
    //   type: Number,
    //   default: 10
    // },
    // max: {
    //   type: Number,
    //   default: 10
    // }
  }
};
</script>

<style scoped>
.color {
  height: 35px;
  width: 35px;
  border-radius: 50px;
  cursor: pointer;
}
</style>
