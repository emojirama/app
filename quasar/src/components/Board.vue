<template>
  <div v-touch-swipe.mouse="move" class="grid" :style="style">
    <square
      v-for="(e, i) in $store.getters.getBoard.flat()"
      :key="i"
      :emoji="e.emoji"
      :color="e.color"
      :position="e.position"
      >f</square
    >
  </div>
</template>

<script>
import Square from "./Square.vue";
export default {
  created() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  components: {
    Square
  },
  props: {
    cols: {
      type: Number,
      default: 5
    },
    rows: {
      type: Number,
      default: 5
    }
  },
  methods: {
    handleKeyDown(e) {
      if (this.$store.getters.showSquarePicker) {
        return;
      }
      const directions = {
        w: "up",
        i: "up",
        a: "left",
        j: "left",
        s: "down",
        k: "down",
        d: "right",
        l: "right"
      };
      this.$store.commit("move", directions[e.key]);
    },
    move(e) {
      this.$store.commit("move", e.direction);
    }
  },
  computed: {
    style() {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${this.$store.getters.getCols}, ${
          this.$store.getters.getSquareSize
        }px)`,
        gridTemplateRows: `repeat(${this.$store.getters.getRows}, ${
          this.$store.getters.getSquareSize
        }px)`
      };
    }
  }
};
</script>

<style scoped></style>
