<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleDebugModal')">
      <q-btn push round
        ><div z-index="100000">
          <div class="emoji-btn">
            <emoji
              :native="$store.getters.getUseNativeEmoji"
              :data="emojiIndex"
              :emoji="`gear`"
              :size="32"
              :set="$store.getters.getEmojiSet"
            />
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog v-model="showDebugModal">
      <q-card class="q-card">
        <q-card-section class="welcome">
          <div class="text-h6">
            Settings
            <q-slider v-model="squareSize" :min="5" :max="200"></q-slider>
          </div>
        </q-card-section>

        <q-card-section>
          <q-toggle
            v-model="useNativeEmoji"
            label="Use native emoji"
          ></q-toggle>
        </q-card-section>

        <q-card-section v-if="!$store.getters.getUseNativeEmoji">
          <q-select
            v-model="emojiSet"
            :options="$store.getters.getEmojiSetOptions"
          ></q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            push
            label="OK"
            color="primary"
            @click="$store.commit('toggleDebugModal')"
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
import { mapGetters } from "vuex";
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
    ...mapGetters(["getArea", "getRows", "getCols"]),
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
    useNativeEmoji: {
      get() {
        //
        return this.$store.getters.getUseNativeEmoji;
      },
      set() {
        this.$store.commit("toggleUseNativeEmoji");
      }
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
.meta {
  position: absolute;
  background-color: beige;
  top: 44px;
  height: 100px;
  right: 16px;
  color: red;
  z-index: 100;
}

.trigger {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
}

.q-card {
  width: 300px;
}
</style>
