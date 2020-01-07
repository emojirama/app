<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleShowSceneMenu')">
      <q-btn push round
        ><div z-index="100000">
          <div class="emoji-btn">
            <emoji
              :native="$store.getters.getUseNativeEmoji"
              :data="emojiIndex"
              :emoji="`world_map`"
              :size="32"
              :set="$store.getters.getEmojiSet"
              :skin="1"
            />
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog v-model="showSceneMenu">
      <q-card class="q-card">
        <q-card-section>
          Scenes
          <div v-for="(scene, i) in $store.getters.getScenes" :key="i">
            <q-btn @click="$store.commit('switchScene', { nextScene: i })">
              {{ i }}
            </q-btn>
            <div class="delete-button">
              <q-btn @click="$store.dispatch('deleteScene', i)">
                <emoji
                  :native="$store.getters.getUseNativeEmoji"
                  :data="emojiIndex"
                  :emoji="`wastebasket`"
                  :size="16"
                  :set="$store.getters.getEmojiSet"
                  :skin="1"
              /></q-btn>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            push
            label="New Scene"
            color="primary"
            @click="$store.commit('createNewScene')"
          />
          <q-btn
            push
            label="Exit"
            color="warning"
            @click="$store.commit('toggleShowSceneMenu')"
          ></q-btn>
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
export default {
  components: {
    Emoji
  },
  data() {
    return {
      emojiIndex: emojiIndex
    };
  },
  created() {},
  destroyed() {},
  computed: {
    showSceneMenu: {
      get() {
        console.log(this.$store.getters.getShowSceneMenu);
        return this.$store.getters.getShowSceneMenu;
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
.delete-button {
  display: inline;
}
.delete-button span.emoji-mart-emoji {
  padding: 0px;
  height: 10px;
}
.q-card {
  background: white;
}

.trigger {
  position: absolute;
  top: 10px;
  left: 70px;
  height: 50px;
  width: 50px;
  z-index: 100;
}

.square-config {
  justify-content: center;
  width: 250px;
  display: grid;
  grid-template-rows: 1fr;
}

.square-preview {
  border-radius: 5px;
}
</style>
