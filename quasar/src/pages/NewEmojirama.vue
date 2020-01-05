<template>
  <base-page>
    <base-btn @click.native="createNewEmojirama">New Emojirama</base-btn>
  </base-page>
</template>

<script>
export default {
  methods: {
    createNewEmojirama() {
      this.$store.dispatch("createNewEmojirama", { vm: this });
    }
  }
};
</script>

<style lang="scss" scoped></style>
