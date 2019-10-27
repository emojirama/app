<template>
  <div
    @mouseenter="handleMouseEnter"
    @click="setSquare"
    class="square"
    :style="style"
  >
    <template v-if="emoji && !isCurrentSquare">
      <emoji
        :native="$q.platform.is.mobile && $q.platform.is.desktop"
        :skin="tone"
        set="apple"
        :emoji="getSquareEmoji"
        :size="($store.getters.getSquareSize * 4) / 5"
      />
    </template>
    <template v-else>
      <emoji
        v-if="isCurrentSquare"
        :native="$q.platform.is.mobile && $q.platform.is.desktop"
        :emoji="$store.getters.getCurrentEmoji['emoji']"
        :skin="$store.getters.getCurrentEmoji['tone']"
        :size="($store.getters.getSquareSize * 4) / 5"
      />
    </template>
  </div>
</template>

<script>
/* eslint-disable no-constant-condition */
import { Emoji } from "emoji-mart-vue";
export default {
  components: {
    Emoji
  },
  props: {
    emoji: {
      type: Object,
      default: () => {
        return {
          emoji: "elf",
          tone: 3
        };
      }
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
        return "elf";
      }

      return null;
    },
    getSquareEmoji() {
      if (this.emoji === null) return "";
      if (
        this.position[0] === this.$store.getters.getPosition[0] &&
        this.position[1] === this.$store.getters.getPosition[1]
      ) {
        return this.$store.getters.getCurrentEmoji; // this.emoji;
      }
      return this.emoji;
    },
    style() {
      return {
        height: `${this.$store.getters.getSquareSize}px`,
        width: `${this.$store.getters.getSquareSize}px`,
        backgroundColor: this.color
      };
    }
  },
  created() {
    // this.emoji = this.getEmoji;
  },
  methods: {
    handleMouseEnter() {
      console.log("handling mouse enter");
      if (this.$store.getters.getMouseDown) {
        this.setSquare();
      }
    },
    setSquare() {
      this.$store.dispatch("setSquare", this.position);
    }
  }
};
</script>

<style scoped>
span.emoji-mart-emoji {
  padding: 0px;
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
