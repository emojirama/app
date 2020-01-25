<template>
  <base-page>
    <page-text> Logging in with {{ provider }}... </page-text>
  </base-page>
</template>

<script>
// import * as Cookies from "js-cookie";
export default {
  methods: {
    handleOauthCallback() {
      this.$store.dispatch("handleOauthCallback", { vm: this });
    }
  },
  created() {
    this.handleOauthCallback();
  },
  computed: {
    provider() {
      return this.$route.params.provider;
    }
  }
};
</script>

<style lang="scss" scoped></style>
