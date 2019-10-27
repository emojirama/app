<template>
  <picker
    :autoFocus="!$q.platform.is.mobile"
    :data="emojiIndex"
    @select="setSquarePickerEmoji"
    :perLine="7"
    :skin="$store.getters.getSquarePickerToneNumber"
    :showPreview="false"
    :showCategories="false"
    :pickerStyles="{ textAlign: 'center' }"
  />
</template>

<script>
import "emoji-mart-vue-fast/css/emoji-mart.css";
import data from "emoji-mart-vue-fast/data/all.json";
import { EmojiIndex } from "emoji-mart-vue-fast";
import { Picker } from "emoji-mart-vue-fast";
let emojiIndex = new EmojiIndex(data);
export default {
  components: {
    Picker
  },
  data() {
    return {
      emojiIndex: emojiIndex
    };
  },
  methods: {
    setSquarePickerEmoji(emoji) {
      this.$store.dispatch("setSquarePickerEmoji", emoji.id);
    }
  }
};
</script>

<style scoped>
div .emoji-mart {
  height: 150px;
}
</style>
