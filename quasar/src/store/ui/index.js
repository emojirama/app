const state = {
  visible: false,
  isDark: true,
  leftDrawerOpen: false,
  nextLink: null,
  authPanel: "login",
  // game
  showSettingsModal: false,
  showDebugModal: false,
  showStatsPanel: false,
  useNativeEmoji: false,
  showHomeModal: false,
  previewWidth: null
};

const getters = {
  leftDrawerOpen: s => s.leftDrawerOpen,
  authModalVisible: s => s.visible,
  getNextLink: s => s.nextLink,
  getAuthPanel: s => s.authPanel,
  isDark: s => s.isDark,
  // game
  showSettingsModal: s => s.showSettingsModal,
  showDebugModal: s => s.showDebugModal,
  showStatsPanel: s => s.showStatsPanel,
  getUseNativeEmoji: s => s.useNativeEmoji,
  showHomeModal: s => s.showHomeModal,
  getPreviewWidth: s => s.previewWidth
};

const mutations = {
  setPreviewWidth: (state, payload) => {
    state.previewWidth = payload;
  },
  toggleDarkMode: state => {
    state.isDark = !state.isDark;
  },
  setAuthPanel: (state, payload) => {
    state.authPanel = payload;
  },
  toggleLoginMenu: state => {
    state.visible = !state.visible;
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
  }
};

export default {
  state,
  getters,
  mutations
};
