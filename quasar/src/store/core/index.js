const state = {};

const getters = {};

const mutations = {};

const actions = {
  deleteEmojirama: (state, payload) => {
    const url = `/api/emojirama/${payload.id}/`;
    payload.vm.$axios.delete(url).then(() => {});
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
