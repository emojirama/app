<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleDebugModal')">
      <q-btn push round
        ><div z-index="100000">
          <div class="emoji-btn">
            <emoji :data="emojiIndex" :emoji="`gear`" :size="32" />
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog v-model="showDebugModal">
      <q-card class="q-card">
        <q-card-section class="welcome">
          <div class="text-h6">
            Debug Info
          </div>
        </q-card-section>

        <q-card-section>
          Rows: {{ getRows }}, Cols: {{ getCols }}, Area: {{ getArea }}
          <br />
          Mode: {{ $store.getters.getMode }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            push
            label="OK"
            color="primary"
            @click="$store.commit('toggleDebugModal')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import "emoji-mart-vue-fast/css/emoji-mart.css";
import data from "emoji-mart-vue-fast/data/all.json";
import { EmojiIndex } from "emoji-mart-vue-fast";
import { Emoji } from "emoji-mart-vue-fast";
let emojiIndex = new EmojiIndex(data);
import { mapGetters } from "vuex";
export default {
  components: {
    Emoji
  },
  data() {
    return {
      emojiIndex: emojiIndex
    };
  },
  computed: {
    ...mapGetters(["getArea", "getRows", "getCols"]),
    showDebugModal: {
      get() {
        return this.$store.getters.showDebugModal;
      },
      set() {}
    }
  },
  methods: {
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
</script>

<style scoped>
.meta {
  position: absolute;
  background-color: beige;
  top: 44px;
  height: 100px;
  right: 16px;
  color: red;
  z-index: 100;
}

.trigger {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
}
</style>
