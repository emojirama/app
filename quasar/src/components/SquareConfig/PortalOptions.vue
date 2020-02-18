<template>
  <q-card-section>
    <div class="square-preview">
      <div
        :style="`backgroundColor: ${squareConfigBackgroundColor}`"
        v-if="squareConfigEmoji"
      >
        <base-emoji
          :native="false"
          :skin="squareConfigEmojiSkin"
          :emoji="squareConfigEmoji"
          :size="64"
        />
      </div>
      <div v-else></div>
      <div v-if="!portalExists">
        <q-select
          outlined
          :dark="$store.getters.isDark"
          label="To Scene"
          ref="scenes"
          :options="$store.getters.getSceneOptions"
          v-model="selectedScene"
        >
        </q-select>
        <div v-if="selectedScene" class="coords">
          <base-input
            class="coord"
            type="number"
            v-model="toX"
            label="Col"
          ></base-input>
          <base-input
            class="coord"
            type="number"
            v-model="toY"
            label="Row"
          ></base-input>
        </div>
        <q-btn @click="setPortal">Set Portal</q-btn>
      </div>
      <div v-else>
        <base-btn @click.native="$store.dispatch('removePortal')"
          >Remove Portal</base-btn
        >
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      selectedScene: null,
      toX: 5,
      toY: 5
    };
  },
  computed: {
    portalExists: {
      get() {
        const portal = !!this.$store.getters.getSquareConfig(
          this.$store.getters.getSquareConfigPosition
        )["portal"];
        return portal;
      }
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
    squareConfigEmojiSkin: {
      get() {
        return this.$store.getters.getSquareConfig(
          this.$store.getters.getSquareConfigPosition
        )["tone"];
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
      const toPos = [parseInt(this.toX, 10), parseInt(this.toY, 10)];
      this.$store.dispatch("setPortal", {
        fromScene,
        toScene,
        fromPos,
        toPos
      });
    }
  }
};
</script>

<style scoped>
.square-preview {
  display: grid;
  gap: 10px;
  min-width: 200px;
  grid-template-rows: 1fr;
}
.coords {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
}
.coord {
  max-width: fit-content;
}
</style>
