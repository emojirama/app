const state = {
  showSettingsModal: true,
  showDebugModal: false,
  showStatsPanel: false,
  useNativeEmoji: false
};

const getters = {
  showSettingsModal: s => s.showSettingsModal,
  showDebugModal: s => s.showDebugModal,
  showStatsPanel: s => s.showStatsPanel,
  getUseNativeEmoji: s => s.useNativeEmoji
};

const mutations = {
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
  }
};

export default {
  state,
  getters,
  mutations
};
