/* eslint-disable no-unused-vars */

import { Notify } from "quasar";

const emojiChoices = [
  "deciduous_tree",
  "deciduous_tree",
  "deciduous_tree",
  "butterfly",
  "elf",
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
  null,
  null
];
const colorChoices = [
  "darkgreen",
  // "#4F7942",
  "#228B22"
  // "#ffc04c",
  // "#ffd27f",
  // "#ffc04c",
  // "lightblue"
];

const randomSquare = () =>
  emojiChoices[Math.floor(Math.random() * emojiChoices.length)];
const randomColor = () =>
  colorChoices[Math.floor(Math.random() * colorChoices.length)];

const b = (h, w) =>
  Array(h)
    .fill()
    .map((_, i) => {
      return Array(w)
        .fill()
        .map((_, j) => {
          return {
            emoji: randomSquare(),
            color: randomColor(),
            position: [i, j],
            tone: null
          };
        });
    });

const state = {
  squareSize: 40,
  rows: 0,
  cols: 0,
  area: 0,
  board: b(50, 50),
  position: [10, 10],
  currentEmoji: "poop",
  anchor: [5, 5]
};

const getters = {
  getSquareSize: s => s.squareSize,
  getRows: s => s.rows,
  getCols: s => s.cols,
  getArea: s => s.area,
  // board view takes a slice of the current board
  // starts at the anchor coordinates
  // width based on columns, height based on rows
  getBoard: s =>
    s.board
      .slice(s.anchor[0], s.anchor[0] + s.rows)
      .map(x => x.slice(s.anchor[1], s.anchor[1] + s.cols)),
  getPosition: s => s.position,
  getCurrentEmoji: s => s.currentEmoji
};

const actions = {
  setSquare: ({ state, commit, rootState, getters }, payload) => {
    const currentEmoji = getters.getSquarePickerEmoji;
    const currentColor = getters.getSquarePickerColor;
    const currentTone = getters.getSquarePickerToneNumber;
    const mode = getters.getMode;
    const data = {
      mode,
      location: payload,
      color: currentColor,
      emoji: currentEmoji,
      tone: currentTone
    };
    commit("setSquare", data);
  },
  move: ({ state, commit, rootState, getters }, payload) => {
    switch (payload) {
      case "left":
        commit("move", "left");
        break;
      case "right":
        commit("move", "right");
        break;
      case "up":
        commit("move", "up");
        break;
      case "down":
        commit("move", "down");
        break;
    }
  }
};

const mutations = {
  setSquare: (state, payload) => {
    const [x, y] = payload["location"];
    if (payload.mode === "both") {
      state.board[x][y]["emoji"] = payload.emoji;
      state.board[x][y]["color"] = payload.color;
      state.board[x][y]["tone"] = payload.tone;
    } else if (payload.mode === "only_emoji") {
      state.board[x][y]["emoji"] = payload.emoji;
      state.board[x][y]["tone"] = payload.tone;
    } else if (payload.mode === "only_color") {
      state.board[x][y]["color"] = payload.color;
    } else if (payload.mode === "delete_emoji") {
      state.board[x][y]["emoji"] = null;
      state.board[x][y]["tone"] = null;
    }
    // Notify.create(`${payload[0]}, ${payload[1]}`);
  },
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
        // state.anchor = [state.anchor[0], state.anchor[1] + 1];
        state.position = [state.position[0], state.position[1] + 1];
        break;
      case "up":
        state.position = [state.position[0] - 1, state.position[1]];
        break;
      case "down":
        // state.anchor = [state.anchor[0] + 1, state.anchor[1]];
        state.position = [state.position[0] + 1, state.position[1]];
        break;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
