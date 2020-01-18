<template>
  <div @touchmove="handleScroll">
    <div class="trigger" @click="saveEmojirama">
      <emoji-button emoji="floppy_disk"></emoji-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showHomeModal: {
      get() {
        return this.$store.getters.showHomeModal;
      },
      set() {}
    }
  },
  methods: {
    saveEmojirama() {
      this.$store.dispatch("saveEmojirama", { vm: this });
    },
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
  top: 10px;
  right: 60px;
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
