<template>
  <div>
    <div class="trigger" @click="$store.commit('toggleSettingsModal')"></div>
    <q-dialog v-model="showSettingsModal">
      <q-card class="q-card">
        <q-card-section class="welcome">
          <div class="text-h6">
            welcome to emojirama!
          </div>
        </q-card-section>

        <q-card-section>
          Click the bottom right corner of the screen to display this menu.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            push
            label="OK"
            color="primary"
            @click="$store.commit('toggleSettingsModal')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    window.addEventListener("keypress", this.openSettingsModal);
  },
  destroyed() {
    window.removeEventListener("keypress", this.openSettingsModal);
  },
  methods: {
    openSettingsModal(e) {
      console.log(e);
      if (e.key == "m" || e.key == "M") {
        this.$store.commit("toggleSettingsModal");
      }
    }
  },
  computed: {
    showSettingsModal: {
      get() {
        return this.$store.getters.showSettingsModal;
      },
      set() {}
    }
  }
};
</script>

<style scoped>
.q-card {
  background: white;
}

.trigger {
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 50px;
  width: 50px;
  z-index: 100;
}
</style>
