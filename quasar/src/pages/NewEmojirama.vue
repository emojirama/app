<template>
  <base-page>
    <div class="button-wrapper">
      <div>
        <base-btn
          class="full-width"
          id="new-emojirama-from-config"
          @click.native="createNewEmojiramaFromConfig"
          >New Emojirama from Config</base-btn
        >
      </div>
      <div>
        <scene-config :sceneConfig="$store.getters['sceneConfig/getLayers']" />
      </div>
    </div>
  </base-page>
</template>

<script>
export default {
  methods: {
    createNewEmojiramaFromConfig() {
      this.$store.dispatch("createNewEmojiramaFromConfig");
      this.$router.push("/game");
    }
  }
};
</script>

<style scoped>
.button-wrapper {
  display: grid;
  gap: 10px;
}
</style>
