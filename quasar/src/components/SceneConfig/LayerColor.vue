<template>
  <div>
    <div
      @click="deleteLayerColor"
      class="color"
      :style="`backgroundColor: ${color.base}`"
    >
      &nbsp;
    </div>
  </div>
</template>

<script>
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
