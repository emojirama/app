<template>
  <q-btn :id="id" :style="`background: ${backgroundColor}`" push round
    ><div z-index="100000">
      <div class="emoji-btn">
        <base-emoji
          :native="$store.getters.getUseNativeEmoji"
          :emoji="emoji"
          :skin="tone"
          :size="size"
        />
      </div>
    </div>
  </q-btn>
</template>

<script>
export default {
  props: {
    props: {
      type: String,
      default: "element_id"
    },
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
    },
    size: {
      type: Number,
      default: 32
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
