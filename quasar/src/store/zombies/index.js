/* eslint-disable no-unused-vars */
import astar from "../board/utils/graph";
import _ from "lodash";
const state = {
  zombiePosition: [7, 7]
};

const getters = {
  getZombiePosition: s => s.zombiePosition
};

const actions = {
  moveZombie: ({ dispatch, rootState, getters, rootGetters, commit }) => {
    const board = _.cloneDeep(rootGetters.getCurrentBoard);
    const path = new astar.search(
      board,
      board[getters.getZombiePosition[0]][getters.getZombiePosition[1]],
      board[rootGetters.getPosition[0]][rootGetters.getPosition[1]]
    );
    if (path.length === 0) return;
    const nextPosition = path[0];
    if (_.isEqual(nextPosition, rootGetters.getPosition)) {
      alert("Game Over");
    }
    commit("moveZombie", nextPosition);
  },
  loadZombies: ({ dispatch }) => {
    dispatch("loadEmojirama");
    const zombieInterval = setInterval(function() {
      dispatch("moveZombie");
    }, 250);
  }
};

const mutations = {
  moveZombie: (state, payload) => {
    state.zombiePosition = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
