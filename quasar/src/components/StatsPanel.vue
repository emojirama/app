<template>
  <div>
    <div v-if="false" class="stats">
      <div>Cols: {{ $store.getters.getCols }}</div>
      <div>Rows: {{ $store.getters.getRows }}</div>
      <div>Position: {{ $store.getters.getPosition }}</div>
      <div>Anchor: {{ $store.getters.getAnchor }}</div>
      <div>Square Size: {{ $store.getters.getSquareSize }}px</div>
      <div>Board Length: {{ $store.state.board.board.length }}</div>
      <div>Board Width: {{ $store.state.board.board[0].length }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  created() {},
  destroyed() {},
  methods: {}
};
</script>

<style scoped>
.q-card {
  background: white;
}

.stats {
  position: absolute;
  background-color: white;
  opacity: 0.4;
  top: 50%;
  left: 0px;
  padding: 20px;
  z-index: 100;
}
</style>
