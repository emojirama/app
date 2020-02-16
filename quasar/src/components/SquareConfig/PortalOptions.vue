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
      selectedScene: null
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
      const toPos = [5, 7];
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
</style>
