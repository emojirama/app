<template>
  <base-page>
    <page-header>Emojirama</page-header>
    <base-btn
      v-for="e in emojirama"
      @click.native="$router.push(`/emojirama/${e.id}`)"
      :key="e.id"
      >{{ e.id }}</base-btn
    >
  </base-page>
</template>

<script>
import { Notify } from "quasar";
export default {
  data() {
    return {
      emojirama: []
    };
  },
  created() {
    this.$axios
      .get(`/api/emojirama/`)
      .then(resp => {
        console.log(resp);
        this.emojirama = resp.data;
      })
      .catch(err => {
        Notify.create(`${err}`);
      });
  }
};
</script>

<style lang="scss" scoped></style>
