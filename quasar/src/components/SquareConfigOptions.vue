<template>
  <div class="options">
    <div @click="$store.dispatch('setActiveSquareConigTab', 'portal')">
      <base-emoji :emoji="`door`" :native="false"></base-emoji>
    </div>
    <div @click="$store.dispatch('setActiveSquareConigTab', 'dialog')">
      <base-emoji :emoji="`speech_balloon`" :native="false"></base-emoji>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.options {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  cursor: pointer;
}
</style>
