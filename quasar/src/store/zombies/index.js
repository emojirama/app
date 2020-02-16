/* eslint-disable no-unused-vars */
import astar from "../board/utils/graph";
import _ from "lodash";
import uuidv1 from "uuid/v1";

const state = {
  welcome: true,
  gameOver: false,
  zombieInterval: null,
  zombieMoveInterval: 600,
  zombieCount: 10,
  zombies: []
};

const getters = {
  getWelcome: s => s.welcome,
  getZombieCount: s => s.zombieCount,
  getZombies: s => s.zombies,
  getZombieSquares: s => {
    return s.zombies.map(x => x.position);
  },
  getZombieForSquare: (s, getters) => position => {
    const zombies = getters.getZombies.filter(e =>
      _.isEqual(e.position, position)
    );
    if (zombies.length > 0) {
      return zombies[0]["zombieCode"];
    }
    return false;
  },
  getZombieMoveInterval: s => s.zombieMoveInterval,
  getGameOver: s => s.gameOver
};

const actions = {
  resetZombies: ({ commit, dispatch }, { initial, created }) => {
    dispatch("createNewEmojiramaFromConfig");
    if (!created) {
      commit("resetZombies", { initial });
      dispatch("loadZombies");
    }
  },
  moveZombies: ({ dispatch, rootState, getters, rootGetters, commit }) => {
    // without deep cloning will be modifying vuex state outside of mutation
    const board = _.cloneDeep(rootGetters.getCurrentBoard);
    getters.getZombieSquares.forEach(x => {
      board[x[0]][x[1]].zombie = true;
    });
    for (let i = 0; i < getters.getZombieSquares.length; i++) {
      const zombie = getters.getZombies[i];
      setTimeout(function() {
        dispatch("moveZombie", { board, zombie });
      }, Math.random() * 500);
    }
  },
  moveZombie: ({ commit, rootGetters }, { board, zombie }) => {
    const path = new astar.search(
      board,
      board[zombie.position[0]][zombie.position[1]],
      board[rootGetters.getPosition[0]][rootGetters.getPosition[1]]
    );
    if (path.length === 0) return;
    const nextPosition = path[0];
    if (_.isEqual(nextPosition, rootGetters.getPosition)) {
      commit("setGameOver", true);
    }

    commit("moveZombie", { position: nextPosition, zombie });
  },
  loadZombies: ({ dispatch, commit, getters }) => {
    dispatch("setupZombies");
    dispatch("createNewEmojiramaFromConfig");
    const zombieInterval = setInterval(function() {
      dispatch("moveZombies");
    }, getters.getZombieMoveInterval);
    commit("setZombieInterval", zombieInterval);
  },
  setupZombies: ({ commit, getters }) => {
    const zombieArray = Array(getters.getZombieCount)
      .fill()
      .map((_, i) => {
        const zombieId = uuidv1();
        const zombieType = Math.random();
        return {
          zombieId,
          zombieCode:
            zombieType > 0.3
              ? zombieType < 0.6
                ? "male_zombie"
                : "female_zombie"
              : "zombie",
          position: [1, i]
        };
      });
    commit("setupZombies", zombieArray);
  }
};

const mutations = {
  setZombieCount: (state, payload) => {
    state.zombieCount = payload;
  },
  setZombieMoveInterval: (state, payload) => {
    state.zombieMoveInterval = payload;
  },
  setZombieInterval: (state, payload) => {
    state.zombieInterval = payload;
  },
  resetZombies: (state, { initial }) => {
    state.gameOver = false;
    if (initial) {
      state.welcome = false;
    }
    clearTimeout(state.zombieInterval);
  },
  setGameOver: (state, payload) => {
    state.gameOver = payload;
  },
  moveZombie: (state, { position, zombie }) => {
    state.zombies.find(x => x.zombieId === zombie.zombieId).position = position;
  },
  setupZombies: (state, payload) => {
    state.zombies = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
