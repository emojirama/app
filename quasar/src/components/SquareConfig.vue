<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleShowSquareConfig')">
      <q-btn push round
        ><div z-index="100000">
          <div class="emoji-btn">
            <emoji
              :native="$store.getters.getUseNativeEmoji"
              :data="emojiIndex"
              :emoji="`control_knobs`"
              :size="32"
              :set="$store.getters.getEmojiSet"
            />
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog v-model="showSquareConfig">
      <q-card class="q-card">
        <q-card-section class="welcome"
          ><div class="text-h6">Settings</div>
        </q-card-section>

        <q-card-section> </q-card-section>

        <q-card-actions align="right">
          <q-btn
            push
            label="OK"
            color="primary"
            @click="$store.commit('toggleShowSquareConfig')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    showDebugModal: {
      get() {
        return this.$store.getters.showDebugModal;
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
    },
    squareSize: {
      get() {
        return this.$store.getters.getSquareSize;
      },
      set(size) {
        this.$store.commit("setSquareSize", size);
        window.dispatchEvent(new Event("resize"));
      }
    },
    showSquareConfig: {
      get() {
        return this.$store.getters.getShowSquareConfig;
      },
      set() {}
    }
  },
  methods: {
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
  bottom: 0px;
  right: 0px;
  height: 50px;
  width: 50px;
  z-index: 100;
}
</style>
