<template>
  <q-dialog v-model="show">
    <div class="wrapper">
      <base-card>
        <div class="menu-wrapper">
          <div class="profile-emoji">
            <div>
              <base-emoji
                :native="false"
                :sheetSize="64"
                :emoji="
                  $store.getters.isAuthenticated
                    ? selectedEmoji || $store.getters.getProfileEmoji
                    : `lock_with_ink_pen`
                "
                :size="64"
                :skin="1"
              />
            </div>
          </div>
          <div>
            <base-btn
              class="full-width select-emoji-button"
              @click.native="showPicker = !showPicker"
              >Select Emoji</base-btn
            >
          </div>
          <div v-if="showPicker" class="picker">
            <base-emoji-picker @selectEmoji="selectEmoji"></base-emoji-picker>
          </div>
          <div>
            <base-btn
              id="save-button"
              @click.native="saveProfile"
              class="full-width"
              color="primary"
              textColor="white"
              >Save</base-btn
            >
          </div>
        </div>
      </base-card>
    </div>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      showPicker: false,
      selectedEmoji: null,
      selectedSkin: 1,
      saveDisabled: false
    };
  },
  methods: {
    saveProfile() {
      const vm = this;
      this.$store
        .dispatch("saveProfile", { profile: this.profileJson, vm })
        .then(() => {});
    },
    selectEmoji(e) {
      this.selectedEmoji = e.id;
      this.showPicker = false;
    }
  },
  computed: {
    profileJson() {
      return {
        emoji: {
          code: this.selectedEmoji,
          skin: this.selectedSkin
        }
      };
    },
    getShowPicker() {
      return this.showPicker;
    },
    show: {
      get() {
        return this.$store.getters.getShowProfileEditForm;
      },
      set() {
        this.$store.commit("toggleProfileEditForm");
      }
    }
  }
};
</script>

<style scoped>
/* .wrapper {
  height: 250px;
} */
div .emoji-mart {
  height: 250px;
}
.picker {
  position: relative;
}

.menu-wrapper {
  display: grid;
  gap: 10px;
  align-content: center;
  padding: 10px;
}

.profile-emoji {
  display: flex;
  justify-content: center;
}
</style>
