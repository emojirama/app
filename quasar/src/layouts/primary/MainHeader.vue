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
        :emoji="`hamburger`"
        @click.native="toggleLeftDrawer"
        :native="false"
      >
      </base-emoji>
      <q-toolbar-title>{{ $t("emojirama") }}</q-toolbar-title>
      {{ $store.getters.getProfile }}
      <toggle-dark />
      <language-select />
      <auth-widget />
      <profile-edit-form />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  data() {
    return {
      showing: false,
      lang: {
        label: "EN",
        value: "en-us",
        emoji: ":flag-us:"
      }
    };
  },
  methods: {
    setLang(lang) {
      this.lang = lang;
    },
    logout() {
      this.$store.dispatch("authLogout").then(() => this.$router.push("/"));
      this.$router.go();
    },
    toggleLeftDrawer() {
      this.$store.commit("toggleLeftDrawer");
    }
  },
  created() {
    // this.$i18n.locale = "en-us";
  }
};
</script>

<style scoped>
.lang {
  margin-right: 15px;
  cursor: pointer;
  height: 100%;
}
.q-select {
  margin-right: 20px;
}
.base-emoji {
  cursor: pointer;
}
</style>
