<template>
  <base-page>
    <div class="wrapper" ref="preview">
      <div>
        <base-emoji
          :native="false"
          :sheetSize="64"
          :emoji="`file_cabinet`"
          :size="64"
          :skin="1"
        />
      </div>
      <div class="pagination-wrapper">
        <div>
          <base-card>
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
          </base-card>
        </div>
      </div>
      <div class="item-list" v-if="emojirama.length > 0">
        <div
          :data-index="`emojirama_id_${e.id}`"
          v-for="(e, i) in emojirama"
          :key="e.id"
        >
          <div>
            <emojirama-preview @fetchData="fetchData" :i="i" :emojirama="e" />
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-wrapper">
      <div>
        <base-card>
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
        </base-card>
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
      emojirama: [],
      paginationLimit: this.$q.platform.is.mobile ? 1 : 5,
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
      this.emojirama = [];
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
.pagination-wrapper {
  text-align: center;
  display: flex;
  /* align-content: center; */
  justify-content: center;
  padding: 10px;
  width: auto;
}
.wrapper {
  text-align: center;
  display: grid;
  justify-content: center;
  /* overflow-x: hidden; */
  margin-bottom: 10px;
  padding-bottom: 10px;
  width: auto;
}

.q-pagination {
  width: fit-content;
}

.item-list {
  display: grid;
  gap: 15px;
  overflow-x: hidden;
}
</style>
