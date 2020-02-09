<template>
  <base-page>
    <base-btn id="new_emojirama" @click.native="createNewEmojirama"
      >New Emojirama</base-btn
    >
    <base-btn
      id="new-emojirama-from-config"
      @click.native="createNewEmojiramaFromConfig"
      >New Emojirama from Config</base-btn
    >

    <scene-config :sceneConfig="$store.getters['sceneConfig/getLayers']" />
  </base-page>
</template>

<script>
export default {
  methods: {
    createNewEmojirama() {
      this.$store.dispatch("createNewEmojirama", { vm: this });
    },
    createNewEmojiramaFromConfig() {
      this.$store.dispatch("createNewEmojiramaFromConfig");
      this.$router.push("/game");
    }
  }
};
</script>

<style lang="scss" scoped></style>
