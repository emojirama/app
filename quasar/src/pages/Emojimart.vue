<template>
  <base-page>
    <div class="wrapper">
      <div>
        <base-emoji
          :native="false"
          :sheetSize="64"
          :emoji="selectedEmoji"
          :size="100"
          :skin="selectedSkin"
        />
      </div>
      <picker
        :skin="selectedSkin"
        :native="$store.getters.getUseNativeEmoji"
        :set="$store.getters.getEmojiSet"
        :autoFocus="!$q.platform.is.mobile"
        :data="emojiIndex"
        @select="selectEmoji"
        @skin-change="setSkin"
        :perLine="7"
        :pickerStyles="{ textAlign: 'center' }"
      />
      <div class="options">
        <div
          @click="$store.commit('setEmojiSet', set)"
          v-for="(set, i) in $store.getters.getEmojiSets"
          :key="i"
        >
          <base-emoji
            :skin="selectedSkin"
            :native="false"
            :alwaysNotNative="true"
            :emoji="selectedEmoji"
            :set="set"
          ></base-emoji>
        </div>
        <div @click="$store.commit('setUseNativeEmoji', true)">
          <base-emoji
            :skin="selectedSkin"
            :emoji="selectedEmoji"
            :native="true"
          ></base-emoji>
        </div>
      </div>
    </div>
  </base-page>
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
      emojiIndex: emojiIndex,
      selectedEmoji: this.$store.getters.getProfileEmoji,
      selectedSkin: 1
    };
  },
  methods: {
    setSkin(skin) {
      this.selectedSkin = skin;
    },
    selectEmoji(e) {
      this.selectedEmoji = e.id;
    }
  }
};
</script>

<style scoped>
div .emoji-mart {
  height: 350px;
}
.wrapper {
  text-align: center;
  display: grid;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  width: auto;
}

.options {
  display: grid;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>
