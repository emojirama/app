<template>
  <div class="grid" :style="style" v-touch-pan="pan">
    <square
      v-for="(e, i) in $store.getters.getBoard.flat()"
      :key="i"
      :emoji="e.emoji"
      :color="e.color"
      :position="e.position"
      :tone="e.tone"
      >f</square
    >
  </div>
</template>

<script>
import Square from "./Square.vue";
export default {
  data() {
    return {
      panning: false,
      lastMove: new Date().getTime()
    };
  },
  created() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("mouseup", this.handleMouseUp);
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
      if (new Date().getTime() > this.lastMove + 150) {
        this.lastMove = new Date().getTime();
        this.move(e);
      }
    }
  },
  computed: {
    style() {
      const boardRows = this.$store.state.board.board["scenes"][
        this.$store.getters.getCurrentScene
      ].length;
      const boardCols = this.$store.state.board.board["scenes"][
        this.$store.getters.getCurrentScene
      ][0].length;
      // const boardCols = this.$store.state.board.board[0].length;
      return {
        display: "grid",
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

<style scoped></style>
