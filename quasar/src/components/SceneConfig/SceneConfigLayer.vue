<template>
  <div class="layer">
    <base-card :key="layer.uuid" class="card">
      <base-input
        outlined
        pattern="[0-9]*"
        :id="`layer-level-${index}`"
        label="Level"
        :step="0.1"
        type="number"
        :key="layer.uuid"
        v-model="z"
      ></base-input>

      <layer-emoji-list
        :uuid="layer.uuid"
        :emojiList="layer.emoji"
        :index="index"
      />
      <layer-color-list
        :uuid="layer.uuid"
        :colorList="layer.colors"
        :index="index"
      />
      <div>
        <div class="wastebasket" @click="deleteLayer">
          <base-emoji :native="false" :emoji="`wastebasket`" />
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import LayerColorList from "./LayerColorList.vue";
import LayerEmojiList from "./LayerEmojiList.vue";
export default {
  components: {
    LayerEmojiList,
    LayerColorList
  },
  methods: {
    deleteLayer() {
      this.$store.dispatch("sceneConfig/deleteLayer", {
        uuid: this.layer.uuid
      });
    }
  },
  computed: {
    z: {
      get() {
        return this.$store.getters["sceneConfig/getLayerZ"](this.layer.uuid);
      },
      set(z) {
        this.$store.commit("sceneConfig/setLayerZ", {
          z,
          uuid: this.layer.uuid
        });
      }
    }
  },
  props: {
    index: {
      type: Number,
      default: null
    },
    layer: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>
.card {
  padding: 15px;
  display: grid;
  gap: 15px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.wastebasket {
  cursor: pointer;
  float: right;
}
</style>
