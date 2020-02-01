<template>
  <div
    :data-index="`square_${position[0]}_${position[1]}`"
    class="square"
    :style="style"
  >
    <div
      @mouseenter="handleMouseEnter"
      class="square-wrapper"
      @click="setSquare"
      v-touch-hold.mouse="handleHold(position)"
      :style="squareMaskStyle"
    ></div>
    <template v-if="emoji && !isCurrentSquare">
      <base-emoji
        :skin="tone"
        :emoji="getSquareEmoji"
        :native="$store.getters.getUseNativeEmoji"
        :size="
          ($store.getters.getSquareSize *
            ($store.getters.getUseNativeEmoji ? 5 : 4)) /
            5
        "
      />
    </template>
    <template v-else>
      <base-emoji
        v-if="isCurrentSquare"
        :emoji="$store.getters.getCurrentEmoji['emoji']"
        :skin="$store.getters.getCurrentEmoji['tone']"
        :native="$store.getters.getUseNativeEmoji"
        :size="
          ($store.getters.getSquareSize *
            ($store.getters.getUseNativeEmoji ? 5 : 4)) /
            5
        "
      />
    </template>
  </div>
</template>

<script>
/* eslint-disable no-constant-condition */

export default {
  props: {
    emoji: {
      type: String,
      default: "elf"
    },
    color: {
      type: String,
      default: "red"
    },
    position: {
      type: Array,
      default: () => [0, 0]
    },
    tone: {
      type: Number,
      default: 1
    }
  },
  computed: {
    isCurrentSquare() {
      if (
        this.position[0] === this.$store.getters.getPosition[0] &&
        this.position[1] === this.$store.getters.getPosition[1]
      ) {
        return "boy"; //this.$store.getters.getProfileEmoji.code;
      }

      return null;
    },
    getSquareEmoji() {
      if (this.emoji === null) return "";
      if (
        this.position[0] === this.$store.getters.getPosition[0] &&
        this.position[1] === this.$store.getters.getPosition[1]
      ) {
        return this.$store.getters.getProfileEmoji; // this.emoji;
      }
      return this.emoji;
    },
    squareMaskStyle() {
      return {
        height: `${this.$store.getters.getSquareSize}px`,
        width: `${this.$store.getters.getSquareSize}px`,
        fontSize: `${(this.$store.getters.getSquareSize * 4) / 5}px`
        // position: "absolute"
        // filter: "contrast(1%)"
        // backgroundColor: "rgba(0, 0, 0, .5)"
        // backgroundColor: this.color
      };
    },
    style() {
      return {
        height: `${this.$store.getters.getSquareSize}px`,
        width: `${this.$store.getters.getSquareSize}px`,
        backgroundColor: this.color,
        filter: `contrast(130%)`
        // filter: `contrast(${Math.random() * 100 + 100}%)`
      };
    }
  },
  methods: {
    handleHold(position) {
      const vm = this;
      return function() {
        vm.$store.dispatch("toggleShowSquareConfig", position);
      };
    },
    handleMouseEnter(e) {
      if (e.buttons === 1) {
        this.setSquare({ ...e, isTrusted: true, type: "mouseenter" });
      }
    },
    setSquare(e) {
      if (this.$route.meta.live) {
        this.$store.dispatch("setSquare", {
          live: this.$route.meta.live,
          vm: this,
          position: this.position
        });
      } else {
        if (this.$route.meta.preview) return;
        if (e.isTrusted || this.$route.query.cy) {
          this.$store.dispatch("setSquare", {
            live: false,
            vm: this,
            position: this.position
          });
        }
      }
    }
  }
};
</script>

<style scoped>
span.emoji-mart-emoji {
  padding: 0px;
  pointer-events: none;
}

.square-wrapper {
  position: absolute;
  z-index: 1000000;
  width: 40px;
  height: 40px;
  /* background-color: rgba(255, 255, 255, 0.657); */
}

.square {
  display: grid;
  align-content: center;
  text-align: center;
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
