<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleMovementMode')">
      <q-btn push round
        ><div z-index="100000">
          <div class="emoji-btn">
            <base-emoji
              :emoji="
                $store.getters.getMovementMode === 'normal'
                  ? 'footprints'
                  : 'anchor'
              "
            ></base-emoji>
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog v-model="showSquareConfig" @touchmove="handleScroll">
      <q-card class="q-card">
        <div class="square-config">
          <q-card-section>
            <div
              :style="`backgroundColor: ${squareConfigBackgroundColor}`"
              class="square-preview"
              v-if="squareConfigEmoji"
            >
              <base-emoji :emoji="squareConfigEmoji" :size="64" />
            </div>
            <div v-else></div>
            <div v-if="!portalExists">
              <q-select
                label="To Scene"
                ref="scenes"
                :options="$store.getters.getSceneOptions"
                v-model="selectedScene"
              >
              </q-select>
              <q-btn @click="setPortal">Set Portal</q-btn>
            </div>
            <div v-else>
              <base-btn @click.native="$store.dispatch('removePortal')"
                >Remove Portal</base-btn
              >
            </div>
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
export default {
  data() {
    return {
      selectedScene: null
    };
  },
  created() {},
  destroyed() {},
  computed: {
    portalExists: {
      get() {
        const portal = !!this.$store.getters.getSquareConfig(
          this.$store.getters.getSquareConfigPosition
        )["portal"];
        return portal;
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
  grid-template-rows: 1fr;
}

.square-preview {
  border-radius: 5px;
}
* {
  touch-action: none;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
