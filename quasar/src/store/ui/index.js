const state = {
  isDark: true,
  leftDrawerOpen: false,
  showAuthMenu: false,
  showProfileEditForm: false,

  // game
  sets: {
    apple: "Apple",
    google: "Google",
    twitter: "Twitter",
    facebook: "Facebook",
    emojione: "EmojiOne"
  },
  set: "apple",
  emojiSets: ["apple", "facebook", "google", "twitter", "emojione"],
  showSettingsModal: false,
  showDebugModal: false,
  showStatsPanel: false,
  useNativeEmoji: false,
  showHomeModal: false,
  previewWidth: null,
  showLanguageMenu: false,
  currentLanguage: "en-us",
  languages: {
    "en-us": {
      emoji: "flag-us",
      language: "en-us"
    },
    "cn-cn": {
      emoji: "flag-cn",
      language: "cn-cn"
    }
  }
};

const getters = {
  getShowProfileEditForm: s => s.showProfileEditForm,
  getShowAuthMenu: s => s.showAuthMenu,
  getEmojiSetOptions: s => Object.keys(s.sets),
  getEmojiSet: s => s.set,
  leftDrawerOpen: s => s.leftDrawerOpen,
  isDark: s => s.isDark,
  getShowLanguageMenu: s => s.showLanguageMenu,
  // game
  getEmojiSets: s => s.emojiSets,
  showSettingsModal: s => s.showSettingsModal,
  showDebugModal: s => s.showDebugModal,
  showStatsPanel: s => s.showStatsPanel,
  getUseNativeEmoji: s => s.useNativeEmoji,
  showHomeModal: s => s.showHomeModal,
  getPreviewWidth: s => s.previewWidth,
  getDarkModeEmoji: s => {
    return s.isDark ? "new_moon_with_face" : "sun_with_face";
  },
  getLanguages: s => s.languages,
  getCurrentLanguageEmoji: s => {
    return s.languages[s.currentLanguage].emoji;
  }
};

const mutations = {
  toggleProfileEditForm: state => {
    state.showProfileEditForm = !state.showProfileEditForm;
  },
  toggleAuthMenu: state => {
    state.showAuthMenu = !state.showAuthMenu;
  },
  setEmojiSet: (state, payload) => {
    state.set = payload;
    state.useNativeEmoji = false;
  },
  setLanguage: (state, payload) => {
    state.currentLanguage = payload.lang.language;
    state.showLanguageMenu = false;
    payload.vm.$i18n.locale = payload.lang.language;
  },
  toggleLanguageMenu: (state, payload) => {
    if (payload.close) {
      state.showLanguageMenu = false;
    }
    state.showLanguageMenu = !state.showLanguageMenu;
  },
  setPreviewWidth: (state, payload) => {
    state.previewWidth = payload;
  },
  toggleDarkMode: state => {
    state.isDark = !state.isDark;
  },
  toggleLeftDrawer: (state, payload) => {
    if (payload) {
      state.leftDrawerOpen = payload.leftDrawerOpen;
      return;
    }
    state.leftDrawerOpen = !state.leftDrawerOpen;
  },

  // game
  toggleSettingsModal: state => {
    state.showSettingsModal = !state.showSettingsModal;
  },
  toggleDebugModal: state => {
    state.showDebugModal = !state.showDebugModal;
  },
  toggleStatsPanel: state => {
    state.showStatsPanel = !state.showStatsPanel;
  },
  toggleUseNativeEmoji: state => {
    state.useNativeEmoji = !state.useNativeEmoji;
  },
  toggleHomeModal: state => {
    state.showHomeModal = !state.showHomeModal;
  },
  setUseNativeEmoji: (state, payload) => {
    state.useNativeEmoji = payload;
  }
};

export default {
  state,
  getters,
  mutations
};
