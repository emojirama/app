<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleMovementMode')">
      <q-btn push round
        ><div z-index="100000">
          <div class="emoji-btn">
            <emoji
              :native="$store.getters.getUseNativeEmoji"
              :data="emojiIndex"
              :emoji="
                $store.getters.getMovementMode === 'normal'
                  ? 'footprints'
                  : 'anchor'
              "
              :size="32"
              :set="$store.getters.getEmojiSet"
            />
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog v-model="showSquareConfig">
      <q-card class="q-card">
        <div class="square-config">
          <q-card-section>
            <div
              :style="`backgroundColor: ${squareConfigBackgroundColor}`"
              class="square-preview"
              v-if="squareConfigEmoji"
            >
              <emoji
                :native="$store.getters.getUseNativeEmoji"
                :data="emojiIndex"
                :emoji="squareConfigEmoji"
                :size="64"
                :set="$store.getters.getEmojiSet"
                :skin="1"
              />
            </div>
            <div v-else></div>
            <q-select
              label="To Scene"
              ref="scenes"
              :options="$store.getters.getSceneOptions"
              v-model="selectedScene"
            >
            </q-select>
            <q-btn @click="setPortal">Set Portal</q-btn>
          </q-card-section>
        </div>

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
      emojiIndex: emojiIndex,
      selectedScene: "default"
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
    },
    squareConfigBackgroundColor: {
      get() {
        const squareConfig = this.$store.getters.getSquareConfig;
        if (squareConfig !== undefined) {
          return this.$store.getters.getSquareConfig(
            this.$store.getters.getSquareConfigPosition
          )["color"];
        }
        return "#000";
      }
    },
    squareConfigEmoji: {
      get() {
        return this.$store.getters.getSquareConfig(
          this.$store.getters.getSquareConfigPosition
        )["emoji"];
      }
    }
  },
  methods: {
    setPortal() {
      const fromScene = this.$store.getters.getCurrentScene;
      const toScene = this.$refs.scenes.value;
      const fromPos = this.$store.getters.getSquareConfigPosition;
      const toPos = [5, 7];
      this.$store.dispatch("setPortal", {
        fromScene,
        toScene,
        fromPos,
        toPos
      });
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
  bottom: 0px;
  right: 0px;
  height: 50px;
  width: 50px;
  z-index: 100;
}

.square-config {
  justify-content: center;
  width: 250px;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.square-preview {
  border-radius: 5px;
}
* {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
