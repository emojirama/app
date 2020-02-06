<template>
  <div>
    <base-emoji :native="false" :skin="skin" :emoji="emoji" />
  </div>
</template>

<script>
export default {
  props: {
    emoji: {
      type: String,
      default: "boy"
    },
    skin: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped></style>
