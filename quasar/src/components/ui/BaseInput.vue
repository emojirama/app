<template>
  <q-input
    :dark="$store.getters.isDark"
    v-bind="$attrs"
    v-on="$listeners"
  ></q-input>
</template>

<script>
export default {};
</script>

<style scoped></style>
