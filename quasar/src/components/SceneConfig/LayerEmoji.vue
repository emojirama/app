<template>
  <div class="emoji" @click="deleteEmoji">
    <base-emoji :native="false" :skin="skin" :emoji="emoji" />
  </div>
</template>

<script>
export default {
  methods: {
    deleteEmoji() {
      this.$store.dispatch("sceneConfig/deleteLayerEmoji", {
        layerUuid: this.layerUuid,
        emojiUuid: this.emojiUuid
      });
    }
  },
  props: {
    emoji: {
      type: String,
      default: "boy"
    },
    skin: {
      type: Number,
      default: 1
    },
    layerUuid: {
      type: String,
      default: null
    },
    emojiUuid: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped>
.emoji {
  cursor: pointer;
}
</style>
