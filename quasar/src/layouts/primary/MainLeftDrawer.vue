<template>
  <q-drawer
    @hide="hideDrawer"
    @input="hideDrawer"
    @show="showDrawer"
    v-model="leftDrawerOpen"
    content-class="bg-grey-5"
  >
    <q-list>
      <left-menu-link
        :label="$t('leftDrawer.home.main')"
        to="/"
        emoji="house"
        icon="home"
        :caption="$t('leftDrawer.home.sub')"
      />

      <left-menu-link
        emoji="beginner"
        :label="$t('Tutorial')"
        to="/game"
        :caption="$t('An emojirama for beginners')"
        icon="info"
      />
      <left-menu-link
        :label="$t('New Emojirama')"
        to="/new"
        emoji="hammer_and_wrench"
        :caption="$t('Create a new emojirama')"
        icon="info"
      />
      <left-menu-link
        emoji="file_cabinet"
        :label="$t('All Emojirama')"
        to="/emojirama"
        :caption="$t('See all emojirama')"
        icon="info"
      />
      <left-menu-link
        :label="$t('Zombies')"
        to="/zombies"
        emoji="zombie"
        icon="zombie"
        :caption="$t('Night of the Undead')"
      />
      <left-menu-link
        :label="$t('Emojimart')"
        to="/emojimart"
        emoji="department_store"
        icon="info"
        :caption="$t('Unicode 12 Emoji')"
      />
      <left-menu-link
        :label="$t('leftDrawer.about.main')"
        to="/about"
        emoji="information_source"
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
      this.$store.commit("toggleLeftDrawer", {
        leftDrawerOpen: false
      });
    }
  }
};
</script>

<style scoped></style>
