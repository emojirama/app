<template>
  <q-card-section>
    <div class="dialog-settings">
      <base-input maxlength="500" outlined v-model="dialog" type="textarea" />

      <base-btn @click.native="$store.dispatch('setSquareDialog', { dialog })"
        >Set Dialog</base-btn
      >
    </div>
  </q-card-section>
</template>

<script>
export default {
  created() {
    this.dialog = this.$store.getters.getSquareConfig()["dialog"] || "";
  },
  data() {
    return {
      dialog: ""
    };
  },
  computed: {
    getDialog() {
      return this.dialog;
    }
  }
};
</script>

<style scoped>
.dialog-settings {
  display: grid;
  gap: 10px;
  grid-template-rows: 1fr;
  height: fit-content;
}
</style>
