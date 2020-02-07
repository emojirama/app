<template>
  <div>
    <q-dialog v-model="showColorPicker">
      <q-card>
        <div style="padding: 10px;">
          <q-color no-header class="my-picker" @input="selectColor" />
        </div>
        <div>
          <base-btn :color="getSelectedColor" @click.native="addColor"
            >Add Color &nbsp;
            <span
              class="color-preview"
              :style="`background-color: ${selectedColor}`"
            >
              &nbsp;
            </span></base-btn
          >
        </div>
        <!-- <q-range v-model="range" :min="-50" :max="50" label drag-range /> -->
      </q-card>
    </q-dialog>
    <div class="color-section">
      <div class="color-list">
        <layer-color
          v-for="(c, i) in colorList"
          :key="i"
          :color="c"
          :layerUuid="uuid"
        />
      </div>
      <div>
        <div class="art" @click="showColorPicker = true">
          <base-emoji :native="false" :emoji="`art`"></base-emoji>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayerColor from "./LayerColor.vue";
export default {
  components: {
    LayerColor
  },
  data() {
    return {
      showColorPicker: false,
      selectedColor: "#ffffff"
    };
  },
  computed: {
    getSelectedColor() {
      return this.selectedColor;
    }
  },
  methods: {
    selectColor(color) {
      console.log(color);
      this.selectedColor = color;
    },
    addColor() {
      console.log(this.selectedColor);
      this.showColorPicker = false;
      this.$store.dispatch("sceneConfig/addColor", {
        c: this.selectedColor,
        uuid: this.uuid
      });
    }
  },
  props: {
    colorList: {
      type: Array,
      default: () => []
    },
    uuid: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped>
.color-preview {
  border-radius: 50%;
  height: 20px;
  width: 20px;
}
.color-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
span .emoji-mart-emoji {
  /* height: 10px; */
  padding: 0px !important;
}
.art {
  cursor: pointer;
  float: right;
}
.color-section {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
}
</style>
