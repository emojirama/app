/* eslint-disable no-unused-vars */

const emojiChoices = [
  null,
  "palm_tree",
  "camel",
  "circus_tent",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];
const colorChoices = [
  "#ffd27f",
  "#ffc04c",
  "#ffd27f",
  "#ffc04c",
  "#ffd27f",
  "#ffc04c",
  "lightblue"
];

const randomSquare = () =>
  emojiChoices[Math.floor(Math.random() * emojiChoices.length)];
const randomColor = () =>
  colorChoices[Math.floor(Math.random() * colorChoices.length)];

const b = n =>
  Array(n)
    .fill()
    .map((_, i) => {
      return Array(n)
        .fill()
        .map((_, j) => {
          return {
            emoji: randomSquare(),
            color: randomColor(),
            position: [i, j]
          };
        });
    });

const state = {
  squareSize: 40,
  rows: 0,
  cols: 0,
  area: 0,
  board: b(20),
  position: [2, 3],
  currentEmoji: "elf"
};

const getters = {
  getSquareSize: s => s.squareSize,
  getRows: s => s.board.length, //s => s.rows,
  getCols: s => s.board[0].length, //s => s.cols,
  getArea: s => s.area,
  getBoard: s => s.board,
  getPosition: s => s.position,
  getCurrentEmoji: s => s.currentEmoji
};

const mutations = {
  setRows: (state, payload) => {
    state.rows = payload + 1;
    state.area = state.rows * state.cols;
  },
  setCols: (state, payload) => {
    state.cols = payload + 1;
    state.area = state.rows * state.cols;
  },
  move: (state, payload) => {
    switch (payload) {
      case "left":
        state.position = [state.position[0], state.position[1] - 1];
        break;
      case "right":
        state.position = [state.position[0], state.position[1] + 1];
        break;
      case "up":
        state.position = [state.position[0] - 1, state.position[1]];
        break;
      case "down":
        state.position = [state.position[0] + 1, state.position[1]];
        break;
    }
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
