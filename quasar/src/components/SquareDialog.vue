<template>
  <q-dialog @scroll="handleScroll" v-model="show">
    <base-card class="dialog-card">
      <div class="dialog-emoji">
        <base-emoji
          :size="64"
          :native="false"
          :emoji="$store.getters.getDialogEmoji"
          :skin="$store.getters.getDialogEmojiTone"
        ></base-emoji>
      </div>
      <q-card-section>
        <div class="dialog">
          {{ $store.getters.getCurrentDialog }}
        </div>
      </q-card-section>
    </base-card>
  </q-dialog>
</template>

<script>
export default {
  methods: {
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.getters.getShowDialog;
      },
      set(v) {
        this.$store.dispatch("toggleSquareDialog", v);
      }
    }
  }
};
</script>

<style scoped>
.dialog::first-line,
.dialog {
  white-space: pre-wrap;
  white-space: pre-line;
  font-size: 1.5rem;
  /* line-height: 1rem; */
}

.dialog::first-line {
  line-height: 0px;
}

.dialog-card {
  min-width: 200px;
}

.dialog-emoji {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
