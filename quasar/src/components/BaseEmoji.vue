<template>
  <emoji
    :native="$store.getters.getUseNativeEmoji"
    :data="emojiIndex"
    :emoji="emoji"
    :size="size"
    :set="$store.getters.getEmojiSet"
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
  props: {
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

<style lang="scss" scoped></style>
