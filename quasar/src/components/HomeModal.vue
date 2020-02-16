<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleHomeModal')">
      <emoji-button emoji="house"></emoji-button>
    </div>
    <q-dialog v-model="showHomeModal">
      <base-card class="q-card">
        <div class="square-config">
          <q-card-section>
            <h6>
              {{ $t("menu.exitToHome") }}
            </h6>
          </q-card-section>
        </div>

        <q-card-actions align="right">
          <q-btn
            push
            :label="$t('cancel')"
            color="primary"
            @click="$store.commit('toggleHomeModal')"
          />
          <q-btn
            push
            :label="$t('exit')"
            color="warning"
            @click="
              $store.commit('toggleHomeModal');
              $router.push('/');
            "
          ></q-btn>
        </q-card-actions>
      </base-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    showHomeModal: {
      get() {
        return this.$store.getters.showHomeModal;
      },
      set() {}
    }
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
.q-card {
  background: white;
}

.trigger {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 50px;
  width: 50px;
  z-index: 100;
}

.square-config {
  justify-content: center;
  width: 250px;
  display: grid;
  grid-template-rows: 1fr;
}

.square-preview {
  border-radius: 5px;
}
</style>
