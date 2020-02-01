<template>
  <div class="preview-wrapper">
    <base-card>
      <div class="options-wrapper">
        <div class="options">
          <base-btn
            :id="`emojirama_${i}`"
            @click.native="$router.push(`/emojirama/${emojirama.id}`)"
            >{{ emojirama.id }}</base-btn
          >
          <base-btn
            :id="`emojirama_live_${i}`"
            @click.native="$router.push(`/emojirama/live/${emojirama.id}`)"
            >Live {{ emojirama.id }}</base-btn
          >
          <delete-emojirama-widget
            @reload="$emit('fetchData')"
            v-if="
              emojirama.owner_profile &&
                emojirama.owner_profile.id === $store.getters.getCurrentUserId
            "
            :id="emojirama.id"
          />
        </div>
        <div class="grid-preview" :style="style">
          <square
            v-for="(s, j) in emojirama.board.scenes.default.data
              .slice(3, 7)
              .map(x => x.slice(0, cols))
              .flat()"
            :key="j"
            :emoji="s.emoji"
            :color="s.color"
            :position="s.position"
            :tone="s.tone"
          ></square>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import Square from "components/Square.vue";
export default {
  components: {
    Square
  },
  created() {
    this.cols = Math.floor(
      this.$store.getters.getPreviewWidth / this.$store.getters.getSquareSize
    );
  },
  data() {
    return {
      cols: 0,
      rows: 8
    };
  },
  props: {
    i: {
      type: Number
    },
    emojirama: {
      type: Object
    }
  },
  computed: {
    style() {
      return {
        display: "grid",
        marginBottom: "10px",
        gridTemplateColumns: `repeat(${Math.min(
          this.cols, // this.$store.getters.getCols,
          this.cols // boardCols
        )}, ${this.$store.getters.getSquareSize}px)`,
        gridTemplateRows: `repeat(${Math.min(
          3, // this.$store.getters.getRows,
          5 //boardRows
        )}, ${this.$store.getters.getSquareSize}px)`
      };
    }
  }
};
</script>

<style scoped>
.preview-wrapper {
  overflow-x: visible;
  display: flex;
  align-content: center;
  justify-content: center;
  overflow-x: hidden;
}
.base-card {
  padding: 10px;
}

.options {
  /* float: right; */
  display: grid;
  justify-content: center;
  text-align: center;
  gap: 10px;
  padding: 10px 10px 10px 10px;
  /* justify-items: center; */
  grid-template-columns: 1fr 1fr 1fr;
  width: fit-content;
}

.options-wrapper {
  width: auto;
}

.grid-preview {
  overflow-x: hidden;
}
</style>
