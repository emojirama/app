<template>
  <base-page class="base-page-wrapper">
    <div ref="preview">
      <page-header>Emojirama</page-header>
      <div v-for="e in emojirama" :key="e.id">
        <base-btn @click.native="$router.push(`/emojirama/${e.id}`)">{{
          e.id
        }}</base-btn>

        <base-btn @click.native="$router.push(`/emojirama/live/${e.id}`)"
          >Live {{ e.id }}</base-btn
        >
        <emojirama-preview :board="e" />
      </div>
    </div>
  </base-page>
</template>

<script>
import EmojiramaPreview from "./EmojiramaPreview.vue";
import { Notify } from "quasar";
export default {
  components: {
    EmojiramaPreview
  },
  data() {
    return {
      emojirama: []
    };
  },
  mounted() {
    this.$store.commit("setPreviewWidth", this.$refs.preview.clientWidth);
  },
  created() {
    this.$axios
      .get(`/api/emojirama/`)
      .then(resp => {
        this.emojirama = resp.data;
      })
      .catch(err => {
        Notify.create(`${err}`);
      });
  }
};
</script>

<style scoped>
.base-page-wrapper {
  overflow-y: scroll;
  height: 100vh;
}
</style>
