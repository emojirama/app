<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="saveEmojirama">
      <q-btn push round
        ><div z-index="100000">
          <div class="emoji-btn">
            <emoji
              :native="$store.getters.getUseNativeEmoji"
              :data="emojiIndex"
              :emoji="`floppy_disk`"
              :size="32"
              :set="$store.getters.getEmojiSet"
              :skin="1"
            />
          </div>
        </div>
      </q-btn>
    </div>
    <!-- <q-dialog v-model="showHomeModal">
      <q-card class="q-card">
        <div class="square-config">
          <q-card-section>
            <h6>
              Exit to Home Menu?
            </h6>
          </q-card-section>
        </div>

        <q-card-actions align="right">
          <q-btn push label="Cancel" color="primary" />
          <q-btn push label="Exit" color="warning"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </div>
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
  created() {},
  destroyed() {},
  computed: {
    showHomeModal: {
      get() {
        return this.$store.getters.showHomeModal;
      },
      set() {}
    },
    emojiSet: {
      get() {
        return this.$store.getters.getEmojiSet;
      },
      set(v) {
        this.$store.commit("setEmojiSet", v);
      }
    }
  },
  methods: {
    saveEmojirama() {
      this.$store.dispatch("saveEmojirama", { vm: this });
    },
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
</script>

<style scoped>
.q-card {
  background: white;
}

.trigger {
  position: absolute;
  top: 10px;
  right: 60px;
  height: 50px;
  width: 50px;
  z-index: 100;
}

.square-config {
  justify-content: center;
  width: 250px;
  display: grid;
  grid-template-rows: 1fr;
}

.square-preview {
  border-radius: 5px;
}
</style>
