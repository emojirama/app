<template>
  <q-dialog v-model="showAuthMenu">
    <base-card>
      <q-card-section>
        <div class="auth-menu-contents">
          <div class="profile-emoji">
            <base-emoji
              :native="false"
              :sheetSize="64"
              :emoji="
                $store.getters.isAuthenticated
                  ? $store.getters.getProfileEmoji
                  : `lock_with_ink_pen`
              "
              :size="50"
              :skin="1"
            />
          </div>
          <div class="auth-menu-button-wrapper">
            <base-btn
              @click.native="clicked"
              id="edit-profile-button"
              buttonClass="full-width"
              textColor="white"
              color="primary"
              >{{ $t("Edit Profile") }}</base-btn
            >
            <base-btn
              @click.native="$store.dispatch('AUTH_LOGOUT')"
              buttonClass="full-width"
              textColor="white"
              color="red"
              >{{ $t("Logout") }}</base-btn
            >
          </div>
        </div>
      </q-card-section>
    </base-card>
  </q-dialog>
</template>

<script>
export default {
  methods: {
    clicked() {
      this.$store.commit("toggleAuthMenu");
      this.$store.commit("toggleProfileEditForm");
    }
  },
  computed: {
    showAuthMenu: {
      get() {
        return this.$store.getters.getShowAuthMenu;
      },
      set() {
        this.$store.commit("toggleAuthMenu");
      }
    }
  }
};
</script>

<style scoped>
.auth-menu-contents {
  align-content: center;
  display: grid;
  gap: 5px;
}

.profile-emoji {
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-menu-button-wrapper {
  display: grid;
  gap: 10px;
}
</style>
