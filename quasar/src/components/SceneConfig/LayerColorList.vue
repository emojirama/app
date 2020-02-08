<template>
  <div>
    <q-dialog v-model="showColorPicker">
      <q-card style="padding: 10px;">
        <div class="color-options">
          <div>
            <q-color no-header class="my-picker" @input="selectColor" />
          </div>
          <div>
            <base-btn
              class="full-width"
              :color="getSelectedColor"
              @click.native="addColor"
              >Add Color &nbsp;
              <span class="color-preview" :style="previewStyle">
                &nbsp;
              </span></base-btn
            >
          </div>
        </div>
        <q-range v-model="range" :min="-50" :max="50" label drag-range />
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
import tinycolor from "tinycolor2";
import LayerColor from "./LayerColor.vue";
export default {
  components: {
    LayerColor
  },
  data() {
    return {
      range: { min: 0, max: 0 },
      showColorPicker: false,
      selectedColor: "#ffffff"
    };
  },
  computed: {
    previewStyle() {
      const c1 = tinycolor(this.selectedColor)
        .darken(Math.abs(this.range.min))
        .toString();
      const c2 = tinycolor(this.selectedColor)
        .lighten(this.range.max)
        .toString();
      return {
        background: `linear-gradient(0deg, ${c1}, ${c2}`
      };
    },
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
        uuid: this.uuid,
        min: this.range.min,
        max: this.range.max
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
.color-options {
  display: grid;
  gap: 10px;
}
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
