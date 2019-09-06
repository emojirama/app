<template>
  <div>
    <div class="trigger" @click="$store.commit('toggleSquarePicker')">
      <q-btn round :color="$store.getters.getSquarePickerColor"
        ><div z-index="100000">
          <div class="emoji-btn">
            <emoji :emoji="$store.getters.getSquarePickerEmoji" :size="32" />
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog v-model="showSquarePicker">
      <q-card class="q-card">
        <q-card-section class="welcome">
          <!-- <q-color
              :style="`height: 100px;`"
              v-model="hex"
              no-header
              class="my-picker"
            /> -->

          <div class="picker-wrapper">
            <picker
              :emoji="$store.getters.getSquarePickerEmoji"
              @select="setSquarePickerEmoji"
              :perLine="7"
              :pickerStyles="{ textAlign: 'center' }"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            push
            label="OK"
            color="primary"
            @click="$store.commit('toggleSquarePicker')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Picker, Emoji } from "emoji-mart-vue";
export default {
  components: {
    Picker,
    Emoji
  },
  created() {
    window.addEventListener("keypress", this.openSquarePicker);
  },
  destroyed() {
    window.removeEventListener("keypress", this.openSquarePicker);
  },
  methods: {
    setSquarePickerEmoji(emoji) {
      // console.log(emoji);
      // this.$q.notify(emoji.colons);
      this.$store.commit("setSquarePickerEmoji", emoji.colons);
    },
    openSquarePicker(e) {
      console.log(e);
      if (e.key == "m" || e.key == "M") {
        this.$store.commit("toggleSquarePicker");
      }
    }
  },
  computed: {
    showSquarePicker: {
      get() {
        return this.$store.getters.showSquarePicker;
      },
      set() {}
    },
    hex: {
      get() {
        return this.$store.getters.getSquarePickerColor;
      },
      set(v) {
        this.$store.commit("setSquarePickerColor", v);
      }
    }
  }
};
</script>

<style scoped>
.q-card {
  background: white;
  min-height: 350px;
  height: fit-content;
}

.trigger {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 100;
}
.q-color-picker__spectrum-tab div .q-color-picker__spectrum-white {
  height: 40px !important;
}

div .emoji-mart {
  height: 300px;
}
.picker-wrapper {
  display: grid;
  justify-items: center;
}
.welcome {
  height: fit-content;
}
span.emoji-mart-emoji {
  height: 32px;
}
.emoji-btn {
  display: grid;
  justify-items: center;
}
</style>
