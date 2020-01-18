<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="$store.commit('toggleMovementMode')">
      <emoji-button
        :emoji="
          $store.getters.getMovementMode === 'normal' ? 'footprints' : 'anchor'
        "
      ></emoji-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
</script>

<style scoped>
.q-card {
  background: white;
}

.trigger {
  position: absolute;
  bottom: 0px;
  right: 0px;
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
* {
  touch-action: none;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
