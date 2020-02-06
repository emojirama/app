<template>
  <game-over />
</template>

<script>
import GameOver from "./GameOver.vue";
export default {
  components: {
    GameOver
  },
  destroyed() {
    this.$store.commit("resetZombies");
  }
};
</script>

<style scoped></style>
