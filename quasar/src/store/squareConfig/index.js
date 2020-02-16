const state = {
  activeSquareConfigTab: "portal"
};

const getters = {
  getActiveSquareConfigTab: s => s.activeSquareConfigTab
};

const actions = {
  setActiveSquareConigTab: ({ commit }, payload) => {
    commit("setActiveSquareConigTab", payload);
  }
};

const mutations = {
  setActiveSquareConigTab: (state, payload) => {
    state.activeSquareConfigTab = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
