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
    <base-btn @click.native="showColorPicker = true">New Color</base-btn>
  </div>
</template>

<script>
export default {
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
    }
  },
  props: {
    props: {
      colors: {
        type: Array,
        default: () => []
      }
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
</style>
