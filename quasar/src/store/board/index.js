const state = {
  squareSize: 40,
  rows: 0,
  cols: 0,
  area: 0
};

const getters = {
  getSquareSize: s => s.squareSize,
  getRows: s => s.rows,
  getCols: s => s.cols,
  getArea: s => s.area
};

const mutations = {
  setRows: (state, payload) => {
    state.rows = payload + 1;
    state.area = state.rows * state.cols;
  },
  setCols: (state, payload) => {
    state.cols = payload + 1;
    state.area = state.rows * state.cols;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
