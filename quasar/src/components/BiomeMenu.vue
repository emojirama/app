<template>
  <div>
    <q-dialog v-model="show">
      <base-card class="wrapper">
        <base-btn
          class="full-width"
          @click.native="$store.dispatch('toggleShowBiomeMenu')"
          >Close</base-btn
        >
        <base-btn
          class="full-width"
          @click.native="$store.dispatch('addSceneFromConfig')"
          >Add Scene</base-btn
        >
        <scene-config-layer />
      </base-card>
    </q-dialog>
  </div>
</template>

<script>
import SceneConfigLayer from "components/SceneConfig/index.vue";

export default {
  components: {
    SceneConfigLayer
  },
  computed: {
    show: {
      get() {
        return this.$store.getters.getShowBiomeMenu;
      },
      set() {
        return this.$store.dispatch("toggleBiomeMenu");
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  padding: 20px;
}
</style>
