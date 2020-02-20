<template>
  <div>
    <div class="layers">
      <q-slider
        :min="1"
        :max="100"
        v-model="zoom"
        :dark="$store.getters.isDark"
      />
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
  computed: {
    zoom: {
      get() {
        return this.$store.getters["sceneConfig/getZoom"];
      },
      set(zoom) {
        this.$store.dispatch("sceneConfig/setZoom", { zoom });
      }
    }
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
