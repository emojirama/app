<template>
  <div @click="$store.commit('toggleDarkMode')" class="dark-toggle">
    <base-emoji
      :native="false"
      :sheetSize="64"
      :emoji="$store.getters.getDarkModeEmoji"
      :skin="1"
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.dark-toggle {
  cursor: pointer;
  height: 100%;
}
</style>
