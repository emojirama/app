<template>
  <div>
    <debug-panel id="debug"></debug-panel>
    <div
      @touchmove="handleScroll"
      @scroll="handleScroll"
      id="board"
      :style="style"
    >
      <board :rows="$store.getters.getRows" :cols="$store.getters.getCols" />
    </div>
  </div>
</template>

<script>
import { dom } from "quasar";
const { height, width } = dom;

// Some aliases of the previous method for "width" and "height" which
// returns Numbers instead of Strings:
import Board from "components/Board.vue";
import DebugPanel from "components/DebugPanel.vue";
export default {
  components: {
    Board,
    DebugPanel
  },
  created() {
    this.handleResize();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },
  data() {
    return {
      style: {},
      rows: 10,
      cols: 10
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    handleResize() {
      console.log("resizing...");
      const b = document.body;
      const rows = Math.floor(height(b) / this.$store.getters.getSquareSize);
      const cols = Math.floor(width(b) / this.$store.getters.getSquareSize);
      this.$store.commit("setRows", rows);
      this.$store.commit("setCols", cols);
      console.log(rows, cols);
      console.log("actual rows, col in store");
      console.log(this.$store.getters.getRows, this.$store.getters.getCols);
      console.log(this.$store.getters.getArea);
    }
  }
};
</script>

<style scoped>
#board {
  top: 50%;
  /* background-color: red; */

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#debug {
  z-index: 10000;
}
</style>
