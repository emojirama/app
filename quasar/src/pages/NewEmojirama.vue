<template>
  <base-page>
    <base-btn id="new_emojirama" @click.native="createNewEmojirama"
      >New Emojirama</base-btn
    >
    <page-text>
      {{ $store.getters["sceneConfig/getLayers"] }}
    </page-text>

    <scene-config :sceneConfig="$store.getters['sceneConfig/getLayers']" />
  </base-page>
</template>

<script>
export default {
  methods: {
    createNewEmojirama() {
      this.$store.dispatch("createNewEmojirama", { vm: this });
    }
  }
};
</script>

<style lang="scss" scoped></style>
