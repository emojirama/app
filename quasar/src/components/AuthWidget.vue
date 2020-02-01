<template>
  <div>
    <auth-menu></auth-menu>
    <div
      id="profile-button"
      v-if="$store.getters.isAuthenticated"
      @click="$store.commit('toggleAuthMenu')"
    >
      <base-emoji
        :native="false"
        :sheetSize="64"
        :emoji="$store.getters.getProfileEmoji"
        :size="28"
        :skin="1"
      />
    </div>
    <div id="auth-widget-button" v-else @click="$router.push('/login')">
      <base-emoji
        :native="false"
        :sheetSize="64"
        :emoji="`lock_with_ink_pen`"
        :size="28"
        :skin="1"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
