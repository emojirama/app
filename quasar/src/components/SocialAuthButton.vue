<template>
  <div>
    <a :href="$store.getters.oauthUrl(provider)">
      <img :src="`/assets/${imagePrefix}.png`" :alt="provider" class="social" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    imagePrefix: {
      type: String
    },
    provider: {
      type: String
    }
  }
};
</script>

<style scoped>
.social {
  max-width: 50px;
  max-height: 50px;
}
</style>
