/* eslint-disable no-unused-vars */
import astar from "../board/utils/graph";
import _ from "lodash";

const state = {
  zombiePosition: [7, 7],
  gameOver: false,
  zombieInterval: null
};

const getters = {
  getZombiePosition: s => s.zombiePosition,
  getGameOver: s => s.gameOver
};

const actions = {
  resetZombies: ({ commit, dispatch }) => {
    commit("resetZombies");
    dispatch("loadZombies");
  },
  moveZombie: ({ dispatch, rootState, getters, rootGetters, commit }) => {
    // without deep cloning will be modifying vuex state outside of mutation
    const board = _.cloneDeep(rootGetters.getCurrentBoard);
    const path = new astar.search(
      board,
      board[getters.getZombiePosition[0]][getters.getZombiePosition[1]],
      board[rootGetters.getPosition[0]][rootGetters.getPosition[1]]
    );
    if (path.length === 0) return;
    const nextPosition = path[0];
    if (_.isEqual(nextPosition, rootGetters.getPosition)) {
      commit("setGameOver", true);
    }
    commit("moveZombie", nextPosition);
  },
  loadZombies: ({ dispatch, commit }) => {
    dispatch("loadEmojirama");
    const zombieInterval = setInterval(function() {
      dispatch("moveZombie");
    }, 250);
    commit("setZombieInterval", zombieInterval);
  }
};

const mutations = {
  setZombieInterval: (state, payload) => {
    state.zombieInterval = payload;
  },
  resetZombies: (state, payload) => {
    state.gameOver = false;
    clearTimeout(state.zombieInterval);
    state.zombiePosition = [7, 7];
  },
  setGameOver: (state, payload) => {
    state.gameOver = payload;
  },
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
