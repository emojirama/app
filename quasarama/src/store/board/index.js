/* eslint-disable no-unused-vars */

import generateBoard from "./randomBoard";

const state = {
  squareSize: 60,
  rows: 0,
  cols: 0,
  area: 0,
  board: {
    scenes: {
      default: {
        data: generateBoard(50, 50)
      },
      new: {
        data: generateBoard(50, 50)
      }
    }
  },
  position: [5, 5],
  currentEmoji: { emoji: "elf", tone: 3 },
  anchor: [0, 0],
  sets: {
    apple: "Apple",
    google: "Google",
    twitter: "Twitter",
    facebook: "Facebook",
    emojione: "EmojiOne"
  },
  set: "apple",
  currentScene: "new",
  showSquareConfig: false,
  squareConfigPosition: [0, 0],
  movementMode: "normal"
};

const getters = {
  getMovementMode: s => s.movementMode,
  getSquareSize: s => s.squareSize,
  getRows: s => s.rows,
  getCols: s => s.cols,
  getArea: s => s.area,
  getCurrentSceneDimensions: s => {
    return [
      s.board.scenes[s.currentScene]["data"].length,
      s.board.scenes[s.currentScene]["data"][0].length
    ];
  },

  // board view takes a slice of the current board
  // starts at the anchor coordinates
  // width based on columns, height based on rows
  getBoard: s =>
    s.board.scenes[s.currentScene]["data"]
      .slice(s.anchor[0], s.anchor[0] + s.rows)
      .map(x => x.slice(s.anchor[1], s.anchor[1] + s.cols)),
  getPosition: s => s.position,
  getCurrentEmoji: s => s.currentEmoji,
  getAnchor: s => s.anchor,
  getEmojiSetOptions: s => Object.keys(s.sets),
  getEmojiSet: s => s.set,
  getCurrentScene: s => s.currentScene,
  getSquareConfigPosition: s => s.squareConfigPosition,
  getShowSquareConfig: s => s.showSquareConfig,
  getSquareConfig: s => position => {
    return s.board["scenes"][s.currentScene]["data"][s.squareConfigPosition[0]][
      s.squareConfigPosition[1]
    ];
  }
};

const actions = {
  toggleShowSquareConfig: (
    { state, commit, rootState, rootGetters },
    payload
  ) => {
    commit("toggleShowSquareConfig");
    commit("setSquareConfigPosition", payload);
    //         vm.$store.commit("setSquareConfigPosition", position);
  },
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
  move: ({ state, commit, rootState, getters, rootGetters }, payload) => {
    if (rootGetters.getMouseDown) {
      return;
    }
    const mode = getters.getMovementMode;
    switch (payload) {
      case "left":
        commit("move", { direction: "left", mode });
        break;
      case "right":
        commit("move", { direction: "right", mode });
        break;
      case "up":
        commit("move", { direction: "up", mode });
        break;
      case "down":
        commit("move", { direction: "down", mode });
        break;
    }
  }
};

const mutations = {
  toggleMovementMode: state => {
    if (state.movementMode === "normal") {
      state.movementMode = "fixed";
    } else if (state.movementMode === "fixed") {
      state.movementMode = "normal";
    }
  },
  setSquareConfigPosition: (state, payload) => {
    state.squareConfigPosition = payload;
  },
  toggleShowSquareConfig: state => {
    state.showSquareConfig = !state.showSquareConfig;
  },
  setSquare: (state, payload) => {
    const currentScene = state.board["scenes"][state.currentScene]["data"];
    const [x, y] = payload["location"];
    if (payload.mode === "both") {
      currentScene[x][y]["emoji"] = payload.emoji;
      currentScene[x][y]["color"] = payload.color;
      currentScene[x][y]["tone"] = payload.tone;
    } else if (payload.mode === "only_emoji") {
      currentScene[x][y]["emoji"] = payload.emoji;
      currentScene[x][y]["tone"] = payload.tone;
    } else if (payload.mode === "only_color") {
      currentScene[x][y]["color"] = payload.color;
    } else if (payload.mode === "delete_emoji") {
      currentScene[x][y]["emoji"] = null;
      currentScene[x][y]["tone"] = null;
    }
  },
  setEmojiSet: (state, payload) => {
    state.set = payload;
  },
  setSquareSize: (state, payload) => {
    state.squareSize = payload;
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
    let nextPos;
    let nextAnchor;
    const mode = payload.mode;
    switch (payload.direction) {
      case "left":
        nextPos = [state.position[0], state.position[1] - 1];
        nextAnchor = [state.anchor[0], state.anchor[1] - 1];
        if (mode === "normal") {
          if (nextPos[1] < state.anchor[1] + 1) {
            state.anchor = [
              state.anchor[0],
              Math.max(state.anchor[1] - state.cols + 2, 0)
            ];
            state.position = nextPos;
            break;
          }
          state.position = nextPos;
        } else if (mode === "fixed") {
          if (nextAnchor[1] < 0) {
            return;
          }
          state.anchor = nextAnchor;
          state.position = nextPos;
        }
        break;
      case "right":
        nextPos = [state.position[0], state.position[1] + 1];
        nextAnchor = [state.anchor[0], state.anchor[1] + 1];
        if (mode === "normal") {
          if (nextPos[1] > state.anchor[1] + state.cols - 2) {
            state.anchor = [
              state.anchor[0],
              Math.min(
                state.anchor[1] + state.cols - 2,
                state.board["scenes"][state.currentScene]["data"][0].length -
                  state.cols
              )
            ];
            state.position = nextPos;
            break;
          }
          // state.anchor = [state.anchor[0], state.anchor[1] + 1];
          state.position = nextPos;
        } else if (mode === "fixed") {
          if (
            nextAnchor[1] >
            state.board["scenes"][state.currentScene]["data"][0].length -
              state.cols
          ) {
            return;
          }
          state.anchor = nextAnchor;
          state.position = nextPos;
        }
        break;
      case "up":
        nextPos = [state.position[0] - 1, state.position[1]];
        nextAnchor = [state.anchor[0] - 1, state.anchor[1]];
        if (mode === "normal") {
          if (nextPos[0] < state.anchor[0] + 1) {
            state.anchor = [
              Math.max(state.anchor[0] - state.rows + 2, 0),
              state.anchor[1]
            ];
            state.position = nextPos;
            break;
          }
          state.position = nextPos;
        } else if (mode === "fixed") {
          if (nextAnchor[0] < 0) {
            return;
          }
          state.anchor = nextAnchor;
          state.position = nextPos;
        }
        break;
      case "down":
        nextPos = [state.position[0] + 1, state.position[1]];
        nextAnchor = [state.anchor[0] + 1, state.anchor[1]];
        if (mode === "normal") {
          if (nextPos[0] > state.anchor[0] + state.rows - 2) {
            state.anchor = [
              Math.min(
                state.anchor[0] + state.rows - 2,
                state.board["scenes"][state.currentScene]["data"].length -
                  state.rows
              ),
              state.anchor[1]
            ];
            state.position = nextPos;
            break;
          }
          state.position = nextPos;
        } else if (mode === "fixed") {
          if (
            nextAnchor[0] >
            state.board["scenes"][state.currentScene]["data"].length -
              state.rows
          ) {
            return;
          }
          state.anchor = nextAnchor;
          state.position = nextPos;
        }
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
