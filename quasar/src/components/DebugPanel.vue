<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleDebugModal')">
      <emoji-button emoji="gear"></emoji-button>
    </div>
    <q-dialog v-model="showDebugModal">
      <q-card class="q-card">
        <q-card-section class="welcome">
          <div class="settings-icons">
            <language-select />
            <toggle-dark />
            <zoom-control emoji="microscope" :zoomAmount="5" />
            <zoom-control emoji="telescope" :zoomAmount="-5" />
            <toggle-stats emoji="bar_chart" />
            <toggle-grid-lines emoji="triangular_ruler" />
          </div>
          <q-slider v-model="squareSize" :min="5" :max="200"></q-slider>
        </q-card-section>
        <q-card-section>
          <div class="options">
            <div
              @click="$store.commit('setEmojiSet', set)"
              v-for="(set, i) in $store.getters.getEmojiSets"
              :key="i"
            >
              <base-emoji
                :skin="3"
                :native="false"
                :alwaysNotNative="true"
                :emoji="$store.getters.getProfileEmoji"
                :set="set"
              ></base-emoji>
            </div>
            <div @click="$store.commit('setUseNativeEmoji', true)">
              <base-emoji
                :emoji="$store.getters.getProfileEmoji"
                :native="true"
              ></base-emoji>
            </div>
          </div>
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
import { mapGetters } from "vuex";
export default {
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
    },
    showStatsPanel: {
      get() {
        return this.$store.getters.showStatsPanel;
      },
      set() {
        this.$store.commit("toggleStatsPanel");
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
.options {
  display: grid;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

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
.settings-icons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-content: center;
  margin: 0 auto;
}
</style>
