<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleShowSceneMenu')">
      <q-btn push round
        ><div z-index="100000">
          <div class="emoji-btn">
            <base-emoji :emoji="`world_map`" />
          </div>
        </div>
      </q-btn>
    </div>
    <q-dialog v-model="showSceneMenu">
      <q-card class="q-card">
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
                  <base-emoji :emoji="`wastebasket`" :size="16"
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
            @click="$store.dispatch('createNewScene', 'biome')"
          />
          <q-btn
            push
            label="New Dungeon"
            color="info"
            @click="$store.dispatch('createNewScene', 'dungeon')"
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
export default {
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
