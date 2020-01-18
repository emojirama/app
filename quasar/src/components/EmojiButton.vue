<template>
  <q-btn :style="`background: ${backgroundColor}`" push round
    ><div z-index="100000">
      <div class="emoji-btn">
        <base-emoji :emoji="emoji" :skin="tone" />
      </div>
    </div>
  </q-btn>
</template>

<script>
export default {
  props: {
    emoji: {
      type: String,
      default: "boy"
    },
    tone: {
      type: Number,
      default: 2
    },
    backgroundColor: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
span.emoji-mart-emoji {
  padding: 0;
  height: 32px !important;
}

.emoji-btn {
  height: 32px;
}
</style>
