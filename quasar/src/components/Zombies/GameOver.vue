<template>
  <div>
    <q-dialog persistent v-model="show">
      <base-card class="game-over-card">
        <page-text>
          Game Over!
        </page-text>
        <base-btn @click.native="$store.dispatch('resetZombies')">
          Play Again
        </base-btn>
      </base-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    show: {
      get() {
        return this.$store.getters.getGameOver;
      }
    }
  }
};
</script>

<style scoped>
.game-over-card {
  padding: 15px;
}
</style>
