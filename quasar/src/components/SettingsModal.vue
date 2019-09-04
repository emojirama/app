<template>
  <div>
    <q-dialog v-model="showSettingsModal">
      <q-card class="q-card">
        <q-card-section class="welcome">
          <div class="text-h6">
            welcome to emojirama!
          </div>
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
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
</style>
