<template>
  <div>
    <div
      @touchmove="handleScroll"
      class="trigger"
      @click="$store.commit('toggleSquarePicker')"
    >
      <q-btn
        push
        round
        :style="`background: ${$store.getters.getSquarePickerColor}`"
        ><div z-index="100000">
          <div class="emoji-btn">
            <emoji
              :data="emojiIndex"
              :skin="$store.getters.getSquarePickerToneNumber"
              :emoji="$store.getters.getSquarePickerEmoji"
              :size="32"
            />
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog transition-show="fade" v-model="showSquarePicker">
      <q-card>
        <q-card-section class="welcome">
          <q-color
            v-if="$store.getters.getSquarePickerTab === 'color'"
            v-model="hex"
            no-header
            class="my-picker"
            @change="$store.commit('setMode', 'only_color')"
          />
          <q-color
            v-else-if="$store.getters.getSquarePickerTab === 'tone'"
            v-model="tone"
            no-header
            no-footer
            default-view="palette"
            class="my-picker"
            :palette="[
              '#ffc93a',
              '#fadcbc',
              '#e0bb94',
              '#bf8e68',
              '#9b643c',
              '#584539'
            ]"
          />

          <div v-else-if="$store.getters.getSquarePickerTab === 'emoji'">
            <emoji-picker />
          </div>
          <div v-else>
            Mode:
            <q-option-group
              :options="options"
              label="Mode"
              type="radio"
              v-model="mode"
            />
          </div>
        </q-card-section>

        <q-card-actions class="buttons" align="right">
          <q-btn
            @click="$store.commit('setSquarePickerTab', 'mode')"
            push
            round
            :style="`background: white`"
            ><div z-index="100000">
              <div class="emoji-btn">
                <emoji :data="emojiIndex" emoji="gear" :size="32" />
              </div>
            </div>
          </q-btn>
          <q-btn
            @click="$store.commit('setSquarePickerTab', 'emoji')"
            push
            round
            :style="`background: ${$store.getters.getSquarePickerColor}`"
            ><div z-index="100000">
              <div class="emoji-btn">
                <emoji
                  :data="emojiIndex"
                  :skin="$store.getters.getSquarePickerToneNumber"
                  :emoji="$store.getters.getSquarePickerEmoji"
                  :size="32"
                />
              </div>
            </div>
          </q-btn>
          <q-btn
            @click="$store.commit('setSquarePickerTab', 'tone')"
            push
            round
            :style="`background: ${$store.getters.getSquarePickerTone}`"
            ><div z-index="100000">
              <div class="emoji-btn"></div>
            </div>
          </q-btn>
          <q-btn
            @click="$store.commit('setSquarePickerTab', 'color')"
            push
            round
            :style="`background: ${$store.getters.getSquarePickerColor}`"
            ><div z-index="100000">
              <div class="emoji-btn">
                <emoji :data="emojiIndex" emoji="art" :size="32" />
              </div>
            </div>
          </q-btn>
          <q-btn
            push
            label="OK"
            color="primary"
            @click="$store.commit('toggleSquarePicker')"
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
import EmojiPicker from "./EmojiPicker.vue";
let emojiIndex = new EmojiIndex(data);
export default {
  data() {
    return {
      options: [
        { label: "Emoji & Color", value: "both" },
        { label: "Only Emoji", value: "only_emoji" },
        { label: "Only Color", value: "only_color" },
        { label: "Clear Emoji", value: "delete_emoji" }
      ],
      emojiIndex: emojiIndex
    };
  },
  components: {
    EmojiPicker,
    Emoji
  },
  created() {},
  destroyed() {},
  methods: {
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    setSquarePickerEmoji(emoji) {
      // console.log(emoji);
      // this.$q.notify(emoji.colons);
      this.$store.commit("setSquarePickerEmoji", emoji.id);
    }
  },
  computed: {
    showSquarePicker: {
      get() {
        return this.$store.getters.showSquarePicker;
      },
      set() {}
    },
    mode: {
      get() {
        return this.$store.getters.getMode;
      },
      set(mode) {
        this.$store.commit("setMode", mode);
      }
    },
    tone: {
      get() {
        return this.$store.getters.getSquarePickerTone;
      },
      set(v) {
        this.$store.commit("setSquarePickerTone", v);
      }
    },
    hex: {
      get() {
        return this.$store.getters.getSquarePickerColor;
      },
      set(v) {
        this.$store.commit("setSquarePickerColor", v);
      }
    }
  }
};
</script>

<style scoped>
.q-card {
  background: white;
  height: 500px !important;
}

.trigger {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 100;
}
/* .q-color-picker__spectrum-tab div .q-color-picker__spectrum-white {
  height: 40px !important;
} */

/* .picker-wrapper {
  display: grid;
  justify-items: center;
} */
.welcome {
  /* height: fit-content; */
}
/* span.emoji-mart-emoji {
  height: 32px;
} */
.emoji-btn {
  display: grid;
  justify-items: center;
}

.emoji-mart-emoji {
  /* height: 44px !important; */
  bottom: 1px;
}

.trigger {
}
</style>
