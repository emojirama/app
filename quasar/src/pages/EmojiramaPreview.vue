<template>
  <div :style="style">
    <square
      v-for="(e, i) in board.board
        .slice(3, 7)
        .map(x => x.slice(0, cols))
        .flat()"
      :key="i"
      :emoji="e.emoji"
      :color="e.color"
      :position="e.position"
      :tone="e.tone"
    ></square>
  </div>
</template>

<script>
import Square from "components/Square.vue";
export default {
  components: {
    Square
  },
  created() {
    this.cols = Math.floor(
      this.$store.getters.getPreviewWidth / this.$store.getters.getSquareSize
    );
  },
  data() {
    return {
      cols: 0,
      rows: 8
    };
  },
  props: {
    board: {
      type: Object
    }
  },
  computed: {
    style() {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(
          this.cols, // this.$store.getters.getCols,
          this.cols // boardCols
        )}, ${this.$store.getters.getSquareSize}px)`,
        gridTemplateRows: `repeat(${Math.min(
          3, // this.$store.getters.getRows,
          5 //boardRows
        )}, ${this.$store.getters.getSquareSize}px)`
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
