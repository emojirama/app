<template>
  <q-header
    :style="
      $store.getters.isDark
        ? 'background:linear-gradient(45deg, purple, teal)'
        : 'background:linear-gradient(135deg, red, orange)'
    "
  >
    <q-toolbar>
      <q-btn
        id="toggleLeftDrawer"
        flat
        dense
        round
        @click="toggleLeftDrawer"
        aria-label="Menu"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>emojirama</q-toolbar-title>
      <toggle-dark />

      <language-select class="language-select" />

      <q-btn
        id="login"
        :ripple="false"
        color="white"
        text-color="primary"
        :label="$t('login')"
        v-if="!$store.getters.isAuthenticated"
        no-caps
        @click="$router.push('/login')"
      />
      <q-btn
        id="logout"
        :ripple="false"
        color="white"
        text-color="primary"
        :label="$t('exit')"
        v-if="$store.getters.isAuthenticated"
        no-caps
        @click="logout"
      />
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
      this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
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

.language-select {
  margin-right: 10px;
}
</style>
