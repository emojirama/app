<template>
  <div>
    <div class="layers">
      <scene-config-layer
        :layer="layer"
        :key="i"
        v-for="(layer, i) in $store.getters['sceneConfig/getLayers']"
      />
    </div>
  </div>
</template>

<script>
import SceneConfigLayer from "./SceneConfigLayer.vue";
export default {
  components: {
    SceneConfigLayer
  },
  props: {
    sceneConfig: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.layers {
  display: grid;
  gap: 10px;
}
</style>
