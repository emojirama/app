const state = {
  showSettingsModal: true,
  showDebugModal: false
};

const getters = {
  showSettingsModal: s => s.showSettingsModal,
  showDebugModal: s => s.showDebugModal
};

const mutations = {
  toggleSettingsModal: state => {
    state.showSettingsModal = !state.showSettingsModal;
  },
  toggleDebugModal: state => {
    state.showDebugModal = !state.showDebugModal;
  }
};

export default {
  state,
  getters,
  mutations
};
