<template>
  <div id="q-app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",

  created: function() {
    this.$store.dispatch("initialAuthCheck");
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.15s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>
