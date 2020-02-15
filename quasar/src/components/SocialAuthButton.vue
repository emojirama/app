<template>
  <div>
    <a :href="$store.getters.oauthUrl(provider)">
      <img :src="getButtonSrc()" :alt="provider" class="social" />
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    getButtonSrc() {
      const prefix =
        process.env.NODE_ENV === "development" ? "/assets/" : "/statics/";
      return prefix + this.imagePrefix + ".png";
    }
  },
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
