<template>
  <div>
    <div class="emoji-section">
      <div class="emoji-list">
        <layer-emoji
          v-for="(emoji, i) in emojiList"
          :key="i + uuid"
          :skin="emoji.tone"
          :emoji="emoji.code"
          :emojiUuid="emoji.uuid"
          :layerUuid="uuid"
        />
      </div>
      <div>
        <div class="emojimart" @click="showModal = true">
          <base-emoji :native="false" :emoji="`department_store`" />
        </div>
      </div>
    </div>
    <q-dialog v-model="showModal">
      <base-card style="padding: 10px; height: 280px;">
        <div class="picker">
          <base-emoji-picker v-if="showPicker" @selectEmoji="selectEmoji" />
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
      showPicker: false,
      showModal: false
    };
  },
  components: {
    LayerEmoji
  },
  props: {
    index: {
      type: Number,
      default: null
    },
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
      this.showModal = false;
    }
  },
  watch: {
    showModal(newShowPicker) {
      const vm = this;
      if (newShowPicker) {
        setTimeout(function() {
          vm.showPicker = true;
        }, 100);
      }
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
.emojimart {
  cursor: pointer;
  float: right;
}
.emoji-section {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
}
</style>
