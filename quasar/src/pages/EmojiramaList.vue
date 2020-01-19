<template>
  <base-page class="base-page-wrapper">
    <div ref="preview">
      <page-header>Emojirama</page-header>
      <div v-for="(e, i) in emojirama" :key="e.id">
        <base-btn
          :id="`emojirama_${i}`"
          @click.native="$router.push(`/emojirama/${e.id}`)"
          >{{ e.id }}</base-btn
        >

        <base-btn
          :id="`emojirama_live_${i}`"
          @click.native="$router.push(`/emojirama/live/${e.id}`)"
          >Live {{ e.id }}</base-btn
        >
        <!-- v-if="e.owner.id === $store.getters.getCurrentUserId" -->
        <emoji-button :native="false" :emoji="`wastebasket`"></emoji-button>
        <emojirama-preview :board="e.board" />
      </div>
    </div>
    <q-card color="white">
      <q-pagination
        v-model="currentPage"
        :color="$store.getters.isDark ? `black` : `grey`"
        :dark="$store.getters.isDark"
        :text-color="$store.getters.isDark ? `white` : `black`"
        :max="getMax"
        :max-pages="6"
        :boundary-numbers="false"
        @input="fetchData"
      >
      </q-pagination>
    </q-card>
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
      emojirama: [],
      paginationLimit: 5,
      currentPage: 1,
      count: null
    };
  },
  mounted() {
    this.$store.commit("setPreviewWidth", this.$refs.preview.clientWidth);
  },
  computed: {
    params() {
      return {
        // ordering: this.ordering.join(','),
        limit: this.paginationLimit,
        offset: (this.currentPage - 1) * this.paginationLimit
      };
    },
    getMax() {
      return Math.ceil(this.count / this.paginationLimit);
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios
        .get(`/api/emojirama/`, {
          params: this.params
        })
        .then(resp => {
          this.emojirama = resp.data.results;
          this.count = resp.data.count;
        })
        .catch(err => {
          Notify.create(`${err}`);
        });
    }
  }
};
</script>

<style scoped>
.base-page-wrapper {
  overflow-y: scroll;
  height: 100vh;
}
</style>
