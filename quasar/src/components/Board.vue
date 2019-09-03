<template>
  <div class="grid" :style="style">
    <square
      v-for="i in $store.getters.getCols * $store.getters.getRows"
      :key="i"
      >f</square
    >
  </div>
</template>

<script>
import Square from "./Square.vue";
import { mapGetters } from "vuex";
export default {
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
  destroyed() {},
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
    },
    ...mapGetters(["getArea"])
  }
};
</script>

<style scoped></style>
