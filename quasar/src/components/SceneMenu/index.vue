<template>
  <div @touchmove="handleScroll">
    <div
      id="scene_menu"
      class="trigger"
      @click="$store.commit('toggleShowSceneMenu')"
    >
      <emoji-button emoji="world_map"></emoji-button>
    </div>
    <q-dialog v-model="showSceneMenu">
      <base-card class="q-card">
        <q-card-section>
          Scenes
          <div class="scene-list-wrapper">
            <div
              class="scene-row"
              v-for="(scene, i) in $store.getters.getScenes"
              :key="i"
            >
              <base-btn
                :color="
                  $store.getters.getCurrentScene === i ? 'primary' : 'white'
                "
                @click.native="$store.commit('switchScene', { nextScene: i })"
              >
                {{ i }}
              </base-btn>
              <div class="delete-button">
                <q-btn
                  :disabled="$store.getters.getCurrentScene === i"
                  @click="$store.dispatch('deleteScene', i)"
                >
                  <base-emoji :native="false" :emoji="`wastebasket`" :size="16"
                /></q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            push
            label="New Biome"
            color="primary"
            @click="$store.dispatch('toggleShowBiomeMenu')"
          />
          <q-btn
            id="new_dungeon"
            push
            label="New Dungeon"
            color="info"
            @click="$store.dispatch('createNewScene', 'dungeon')"
          />
          <q-btn
            id="exit_scene_menu"
            push
            label="Exit"
            color="warning"
            @click="$store.commit('toggleShowSceneMenu')"
          ></q-btn>
        </q-card-actions>
      </base-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    showSceneMenu: {
      get() {
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
  display: grid;
  align-items: right;
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

.scene-list-wrapper {
  display: grid;
  gap: 3px;
  grid-template-rows: repeat(1fr);
}

.scene-row {
  display: grid;
  gap: 3px;
  grid-template-columns: 1fr 1fr;
}
</style>
