<template>
  <div :style="style" class="grid" v-touch-pan="pan">
    <square
      v-for="(e, i) in $store.getters.getBoard.flat()"
      :key="i"
      :emoji="e.emoji"
      :color="e.color"
      :position="e.position"
      :tone="e.tone"
    ></square>
  </div>
</template>

<script>
import Square from "./Square.vue";
export default {
  data() {
    return {
      lastMove: new Date().getTime()
    };
  },
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
    handleMouseUp() {
      this.$store.commit("setMouseDown", false);
    },
    handleMouseDown() {
      this.$store.commit("setMouseDown", true);
    },
    handleKeyDown(e) {
      if (this.$store.getters.showSquarePicker) {
        return;
      }
      if (e.key === "e") {
        this.$store.commit("toggleSquarePicker");
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
      this.$store.dispatch("move", directions[e.key]);
    },
    move(e) {
      this.$store.dispatch("move", e.direction);
    },
    pan(e) {
      if (new Date().getTime() > this.lastMove + 100) {
        this.lastMove = new Date().getTime();
        this.move(e);
      }
    }
  },
  computed: {
    style() {
      console.log("undefined part is....");
      console.log(this.$store.getters.getFullBoard["scenes"]);
      const boardRows = this.$store.getters.getFullBoard["scenes"][
        this.$store.getters.getCurrentScene
      ]["data"].length;
      const boardCols = this.$store.getters.getFullBoard["scenes"][
        this.$store.getters.getCurrentScene
      ]["data"][0].length;
      return {
        display: "grid",
        gap: `${this.$store.getters.getGridLineWidth}px`,
        gridTemplateColumns: `repeat(${Math.min(
          this.$store.getters.getCols,
          boardCols
        )}, ${this.$store.getters.getSquareSize}px)`,
        gridTemplateRows: `repeat(${Math.min(
          this.$store.getters.getRows,
          boardRows
        )}, ${this.$store.getters.getSquareSize}px)`
      };
    }
  }
};
</script>

<style>
.grid {
  background-color: black;
}
</style>
