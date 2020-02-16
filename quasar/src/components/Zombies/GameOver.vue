<template>
  <div>
    <q-dialog persistent v-model="show">
      <base-card v-if="$store.getters.getWelcome" class="game-over-card">
        <div class="zombie-emoji">
          <base-emoji
            :size="64"
            :native="false"
            :emoji="`zombie`"
            :skin="$store.getters.getDialogEmojiTone"
          ></base-emoji>
        </div>
        <page-text>Zombie Mode</page-text>
        <zombie-settings />
        <base-btn
          class="full-width"
          @click.native="
            $store.dispatch('resetZombies', { initial: true, created: false })
          "
        >
          Start
        </base-btn>
      </base-card>
      <base-card v-else class="game-over-card">
        <div class="zombie-emoji">
          <base-emoji
            :size="64"
            :native="false"
            :emoji="`zombie`"
            :skin="$store.getters.getDialogEmojiTone"
          ></base-emoji>
        </div>
        <page-text>Game Over!</page-text>
        <zombie-settings />
        <base-btn
          class="full-width"
          @click.native="
            $store.dispatch('resetZombies', { initial: false, created: false })
          "
        >
          Play Again
        </base-btn>
      </base-card>
    </q-dialog>
  </div>
</template>

<script>
import ZombieSettings from "./ZombieSettings.vue";
export default {
  components: {
    ZombieSettings
  },
  computed: {
    show: {
      get() {
        return (
          this.$store.getters.getGameOver || this.$store.getters.getWelcome
        );
      }
    }
  }
};
</script>

<style scoped>
.game-over-card {
  padding: 15px;
  min-width: 250px;
}
.zombie-emoji {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
