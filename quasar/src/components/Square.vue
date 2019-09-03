<template>
  <div class="square" :style="style">
    <emoji
      native="true"
      :emoji="getEmoji"
      :size="($store.getters.getSquareSize * 4) / 5"
    />
  </div>
</template>

<script>
// import getRandomColor from "utils/color";
import { Emoji } from "emoji-mart-vue";
export default {
  components: {
    Emoji
  },
  computed: {
    getEmoji() {
      return this.choose(this.choices);
    },
    style() {
      return {
        height: `${this.$store.getters.getSquareSize}px`,
        width: `${this.$store.getters.getSquareSize}px`,
        backgroundColor: this.choose(this.colors)
      };
    }
  },
  methods: {
    choose(choices) {
      const index = Math.floor(Math.random() * choices.length);
      return choices[index];
    }
  },
  data() {
    return {
      choices: [
        "evergreen_tree",
        "king",
        "deciduous_tree",
        "evergreen_tree",
        "deciduous_tree",
        "evergreen_tree",
        "deciduous_tree",
        "european_castle",
        "prince",
        "circus_tent",
        "tulip",
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
