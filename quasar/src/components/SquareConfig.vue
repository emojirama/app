<template>
  <div @touchmove="handleScroll">
    <q-dialog v-model="showSquareConfig" @touchmove="handleScroll">
      <base-card class="q-card">
        <div class="square-config">
          <square-config-options />
          <portal-options
            v-if="$store.getters.getActiveSquareConfigTab === 'portal'"
          />
          <dialog-options
            v-if="$store.getters.getActiveSquareConfigTab === 'dialog'"
          />
        </div>

        <q-card-actions align="right">
          <q-btn
            push
            label="OK"
            color="primary"
            @click="$store.commit('toggleShowSquareConfig')"
          />
        </q-card-actions>
      </base-card>
    </q-dialog>
  </div>
</template>

<script>
import SquareConfigOptions from "./SquareConfigOptions.vue";
import PortalOptions from "components/SquareConfig/PortalOptions.vue";
import DialogOptions from "components/SquareConfig/DialogOptions.vue";
export default {
  components: {
    SquareConfigOptions,
    PortalOptions,
    DialogOptions
  },
  computed: {
    showSquareConfig: {
      get() {
        return this.$store.getters.getShowSquareConfig;
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
  bottom: 0px;
  right: 0px;
  height: 50px;
  width: 50px;
  z-index: 100;
}

.square-config {
  justify-content: center;
  display: grid;
  grid-template-rows: 1fr;
}

.square-preview {
  border-radius: 5px;
}
* {
  touch-action: none;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
