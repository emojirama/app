<template>
  <div>
    <div v-if="$store.getters.showStatsPanel" class="stats">
      <div>
        Cols, Rows: [{{ $store.getters.getCols }}, {{ $store.getters.getRows }}]
      </div>
      <div>Position: {{ $store.getters.getPosition }}</div>
      <div>Anchor: {{ $store.getters.getAnchor }}</div>
      <div>Square Size: {{ $store.getters.getSquareSize }}px</div>
      <div>
        Cur Scene Length: {{ $store.getters.getCurrentSceneDimensions[0] }}
      </div>
      <div>
        Cur Scene Width: {{ $store.getters.getCurrentSceneDimensions[1] }}
      </div>
      <div>Emoji Set: {{ $store.getters.getEmojiSet }}</div>
      <div>Current Scene: {{ $store.getters.getCurrentScene }}</div>
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
  top: 15%;
  left: 0px;
  padding: 20px;
  z-index: 100;
}
</style>
