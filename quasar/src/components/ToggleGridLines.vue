<template>
  <div @click="$store.commit('toggleGridLines')" class="dark-toggle">
    <base-emoji
      :native="false"
      :sheetSize="64"
      :emoji="emoji"
      :size="28"
      :skin="1"
    />
  </div>
</template>

<script>
export default {
  props: {
    emoji: {
      type: String
    }
  }
};
</script>

<style scoped>
.dark-toggle {
  cursor: pointer;
  height: 100%;
}
</style>
