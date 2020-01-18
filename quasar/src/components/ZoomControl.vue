<template>
  <div @click="$store.dispatch('setZoom', zoomAmount)" class="dark-toggle">
    <base-emoji
      :native="false"
      :sheetSize="64"
      :emoji="emoji"
      :size="28"
      :skin="1"
    />
  </div>
</template>

<script>
export default {
  props: {
    emoji: {
      type: String
    },
    zoomAmount: {
      type: Number
    }
  }
};
</script>

<style scoped>
.dark-toggle {
  cursor: pointer;
  height: 100%;
}
</style>
