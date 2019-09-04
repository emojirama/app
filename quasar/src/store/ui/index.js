const state = {
  showSettingsModal: true
};

const getters = {
  showSettingsModal: s => s.showSettingsModal
};

const mutations = {
  toggleSettingsModal: state => {
    state.showSettingsModal = !state.showSettingsModal;
  }
};

export default {
  state,
  getters,
  mutations
};
