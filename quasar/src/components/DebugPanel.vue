<template>
  <div @touchmove="handleScroll">
    <div v-if="false" class="meta">
      Rows: {{ getRows }}, Cols: {{ getCols }}, Area: {{ getArea }}
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getArea", "getRows", "getCols"])
  },
  methods: {
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
</script>

<style scoped>
.meta {
  position: absolute;
  background-color: beige;
  top: 44px;
  height: 100px;
  right: 16px;
  color: red;
  z-index: 100;
}
</style>
