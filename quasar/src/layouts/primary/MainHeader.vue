<template>
  <q-header
    :style="
      $store.getters.isDark
        ? 'background:linear-gradient(45deg, purple, teal)'
        : 'background:linear-gradient(135deg, red, orange)'
    "
  >
    <q-toolbar>
      <base-emoji
        class="hamburger"
        :emoji="`hamburger`"
        @click.native="$store.commit('toggleLeftDrawer')"
        :native="false"
      >
      </base-emoji>
      <q-toolbar-title>{{ $t("emojirama") }}</q-toolbar-title>
      <toggle-dark />
      <language-select />
      <auth-widget />
      <profile-edit-form />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {};
</script>

<style scoped>
.hamburger,
.base-emoji {
  cursor: pointer;
}
</style>
