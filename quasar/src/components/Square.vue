<template>
  <div class="square" :style="style">
    <template v-if="emoji">
      <emoji
        :native="false"
        :emoji="getSquareEmoji"
        :size="($store.getters.getSquareSize * 4) / 5"
      />
    </template>
    <template v-else>
      <emoji
        v-if="isCurrentSquare"
        :native="false"
        :emoji="$store.getters.getCurrentEmoji"
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
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "red"
    },
    position: {
      type: Array,
      default: () => [0, 0]
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
        console.log("current!!");
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
    choose(choices) {
      const index = Math.floor(Math.random() * choices.length);
      return choices[index];
    }
  },
  data() {
    return {
      // emoji: "king",
      choices: [
        "evergreen_tree",
        // "king",
        // "deciduous_tree",
        // "evergreen_tree",
        // "deciduous_tree",
        // "evergreen_tree",
        // "deciduous_tree",
        // "european_castle",
        // "prince",
        // "circus_tent",
        // "tulip",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "elf",

        "female_elf"
      ],
      colors: ["#23682f", "#194119", "#235b23", "#235b23", "#235b23"]
    };
  }
};
</script>

<style scoped>
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
