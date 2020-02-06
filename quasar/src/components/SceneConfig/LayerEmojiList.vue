<template>
  <div>
    <div class="emoji-list">
      <layer-emoji
        v-for="(emoji, i) in emojiList"
        :key="i + uuid"
        :skin="emoji.tone"
        :emoji="emoji.code"
      />
    </div>
    <base-btn @click.native="showPicker = true">New</base-btn>
    <q-dialog v-model="showPicker">
      <base-card style="padding: 10px; height: 260px;">
        <div class="picker">
          <base-emoji-picker @selectEmoji="selectEmoji"></base-emoji-picker>
        </div>
      </base-card>
    </q-dialog>
  </div>
</template>

<script>
import LayerEmoji from "./LayerEmoji.vue";
export default {
  data() {
    return {
      showPicker: false
    };
  },
  components: {
    LayerEmoji
  },
  props: {
    emojiList: { type: Array, default: () => [] },
    uuid: { type: String, default: null }
  },
  methods: {
    selectEmoji(e) {
      this.$store.commit("sceneConfig/addEmojiOption", {
        emoji: e,
        uuid: this.uuid
      });
      this.showPicker = false;
    }
  }
};
</script>

<style scoped>
.emoji-list {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
}
div .emoji-mart {
  height: 250px;
}
.picker {
  position: relative;
}
</style>
