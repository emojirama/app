<template>
  <div>
    <div
      @touchmove="handleScroll"
      class="trigger"
      @click="$store.commit('toggleSquarePicker')"
    >
      <emoji-button
        :backgroundColor="$store.getters.getSquarePickerColor"
        :emoji="$store.getters.getSquarePickerEmoji"
      ></emoji-button>
    </div>
    <q-dialog transition-show="fade" v-model="showSquarePicker">
      <q-card>
        <q-card-section class="welcome">
          <div v-if="$store.getters.getSquarePickerTab === 'color'">
            <q-color
              v-model="hex"
              no-header
              class="my-picker"
              @change="$store.commit('setMode', 'only_color')"
            />
            <q-range v-model="range" :min="-50" :max="50" label drag-range />
          </div>
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
            <base-emoji-picker @selectEmoji="selectEmoji" />
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

        <q-card-actions align="right">
          <div class="buttons">
            <div
              class="button"
              @click="$store.commit('setSquarePickerTab', 'mode')"
            >
              <emoji-button emoji="gear"></emoji-button>
            </div>
            <div
              class="button"
              @click="$store.commit('setSquarePickerTab', 'emoji')"
            >
              <emoji-button
                :skin="$store.getters.getSquarePickerToneNumber"
                :emoji="$store.getters.getSquarePickerEmoji"
                :backgroundColor="$store.getters.getSquarePickerColor"
              ></emoji-button>
            </div>
            <div
              class="button"
              @click="$store.commit('setSquarePickerTab', 'tone')"
            >
              <emoji-button
                :backgroundColor="$store.getters.getSquarePickerTone"
                :emoji="null"
              ></emoji-button>
            </div>
            <div
              class="button"
              @click="$store.commit('setSquarePickerTab', 'color')"
            >
              <emoji-button
                :backgroundColor="$store.getters.getSquarePickerColor"
                emoji="art"
              ></emoji-button>
            </div>
            <q-btn
              class="ok"
              push
              round
              label="OK"
              color="primary"
              @click="$store.commit('toggleSquarePicker')"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: "Emoji & Color", value: "both" },
        { label: "Only Emoji", value: "only_emoji" },
        { label: "Only Color", value: "only_color" },
        { label: "Clear Emoji", value: "delete_emoji" }
      ]
    };
  },
  created() {},
  destroyed() {},
  methods: {
    selectEmoji(emoji) {
      this.$store.dispatch("setSquarePickerEmoji", emoji.id);
    },
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    setSquarePickerEmoji(emoji) {
      this.$store.commit("setSquarePickerEmoji", emoji.id);
    }
  },
  computed: {
    range: {
      get() {
        return this.$store.getters.getColorNoiseRange;
      },
      set(v) {
        this.$store.commit("setColorNoiseRange", v);
      }
    },
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
.q-btn {
  width: 50px;
  height: 50px;
}
.buttons {
  margin: auto;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.q-card {
  background: white;
  height: 650px !important;
}

.trigger {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 100;
}
.emoji-btn {
  display: grid;
  justify-items: center;
}
</style>
