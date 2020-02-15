<template>
  <emoji
    :native="useNative"
    :data="emojiIndex"
    :emoji="emoji"
    :size="size"
    :set="set || $store.getters.getEmojiSet"
    :skin="skin"
  />
</template>

<script>
import "emoji-mart-vue-fast/css/emoji-mart.css";
import data from "emoji-mart-vue-fast/data/all.json";
import { EmojiIndex } from "emoji-mart-vue-fast";
import { Emoji } from "emoji-mart-vue-fast";
let emojiIndex = new EmojiIndex(data);
export default {
  components: {
    Emoji
  },
  data() {
    return {
      emojiIndex: emojiIndex
    };
  },
  computed: {
    useNative() {
      if (this.alwaysNotNative) {
        return false;
      }
      if (this.native === true) {
        return true;
      } else if (this.native === false) {
        return this.$store.getters.getUseNativeEmoji;
      } else if (this.native === null) {
        return false;
      } else {
        return false;
      }
    }
  },
  props: {
    alwaysNotNative: {
      type: Boolean
    },
    native: {
      type: Boolean,
      default: true
    },
    set: {
      type: String,
      default: null
    },
    size: {
      type: Number,
      default: 32
    },
    emoji: {
      type: String,
      default: "boy"
    },
    skin: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped>
span {
  max-height: fit-content;
}
</style>
