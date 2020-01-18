<template>
  <q-drawer
    @hide="hideDrawer"
    @input="hideDrawer"
    @show="showDrawer"
    v-model="leftDrawerOpen"
    content-class="bg-grey-5"
  >
    <q-list>
      <q-item-label header>Main Menu</q-item-label>

      <left-menu-link
        :label="$t('leftDrawer.home.main')"
        to="/"
        icon="home"
        :caption="$t('leftDrawer.home.sub')"
      />

      <left-menu-link label="Game" to="/game" caption="Play" icon="info" />
      <left-menu-link
        label="New Emojirama"
        to="/new"
        caption="Create a new emojirama"
        icon="info"
      />
      <left-menu-link
        label="All Emojirama"
        to="/emojirama"
        caption="See all emojirama"
        icon="info"
      />
      <left-menu-link
        :label="$t('leftDrawer.about.main')"
        to="/about"
        icon="info"
        :caption="$t('leftDrawer.about.sub')"
      />
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  created() {
    this.$store.commit("toggleLeftDrawer", { leftDrawerOpen: false });
  },
  computed: {
    leftDrawerOpen: {
      get() {
        return this.$store.getters.leftDrawerOpen;
      },
      set() {}
    }
  },
  methods: {
    showDrawer() {
      this.$store.commit("toggleLeftDrawer", {
        leftDrawerOpen: true
      });
    },
    hideDrawer() {
      console.log("hiding..");
      this.$store.commit("toggleLeftDrawer", {
        leftDrawerOpen: false
      });
    },
    toggleLeftDrawer() {
      this.$store.commit("toggleLeftDrawer");
    }
  }
};
</script>

<style lang="scss" scoped></style>
