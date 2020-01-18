<template>
  <div>
    <div
      @click="$store.commit('toggleLanguageMenu', { close: false })"
      class="lang"
    >
      <base-emoji
        :native="false"
        :sheetSize="64"
        :emoji="$store.getters.getCurrentLanguageEmoji"
        :size="28"
        :skin="1"
      />
    </div>
    <q-dialog persistent v-model="showLanguageMenu">
      <q-card>
        <div class="language-options">
          <div
            class="language-option"
            v-for="(language, i) in $store.getters.getLanguages"
            @click="setLanguage(language)"
            :key="i"
          >
            <base-emoji
              :native="false"
              :emoji="language.emoji"
              :skin="1"
              :size="50"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    setLanguage(lang) {
      const vm = this;
      // this.$store.commit("toggleLanguageMenu", { close: true });
      this.$store.commit("setLanguage", { lang, vm });
    }
  },
  computed: {
    showLanguageMenu: {
      get() {
        return this.$store.getters.getShowLanguageMenu;
      },
      set() {}
    }
  }
};
</script>

<style scoped>
.lang {
  cursor: pointer;
}
.language-option {
  cursor: pointer;
}
.language-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
