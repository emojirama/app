<template>
  <div>
    <div class="layers">
      <base-btn
        id="add-layer"
        @click.native="$store.dispatch('sceneConfig/addLayer')"
      >
        Add Layer
      </base-btn>
      <scene-config-layer
        :layer="layer"
        :key="i"
        :index="i"
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
