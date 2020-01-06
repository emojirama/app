/* eslint-disable no-unused-vars */

import Vue from "vue";
import generateBoard from "./randomBoard";
import { Notify } from "quasar";

const state = {
  squareSize: 60,
  rows: 0,
  cols: 0,
  area: 0,
  board: {
    scenes: {
      default: {
        name: "Home",
        data: [[]]
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
  currentScene: "default",
  showSquareConfig: false,
  squareConfigPosition: [0, 0],
  movementMode: "normal",
  showSceneMenu: false
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
  getFullBoard: s => s.board,
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
  getShowSceneMenu: s => s.showSceneMenu,
  getShowSquareConfig: s => s.showSquareConfig,
  getSquareConfig: s => position => {
    return s.board["scenes"][s.currentScene]["data"][s.squareConfigPosition[0]][
      s.squareConfigPosition[1]
    ];
  },
  getScenes: s => s.board["scenes"],
  getNextSquare: s => direction => {
    let nextSquarePos;
    switch (direction) {
      case "left":
        nextSquarePos = [s.position[0], s.position[1] - 1];
        break;
      case "right":
        nextSquarePos = [s.position[0], s.position[1] + 1];
        break;
      case "up":
        nextSquarePos = [s.position[0] - 1, s.position[1]];
        break;
      case "down":
        nextSquarePos = [s.position[0] + 1, s.position[1]];
        break;
    }
    const nextSquare =
      s.board["scenes"][s.currentScene]["data"][nextSquarePos[0]][
        nextSquarePos[1]
      ];
    // console.log(JSON.stringify(nextSquare));
    return nextSquare;
    // return s.board
  },
  getSceneOptions: s => {
    const scenes = Object.keys(s.board.scenes);
    console.log(scenes);
    return scenes;
  }
};

const actions = {
  setPortal: ({ state, commit }, payload) => {
    console.log(payload.toScene);
    commit("setPortal", payload);
  },
  createNewEmojirama: ({ state }, payload) => {
    payload.vm.$axios.post(`/api/emojirama/new/`).then(resp => {
      payload.vm.$router.push(`/emojirama/${resp.data.id}`);
    });
  },
  saveEmojirama: ({ state }, payload) => {
    payload.vm.$axios
      .post(`/api/emojirama/${payload.vm.$route.params.id}/`, state.board)
      .then(resp => {
        Notify.create("saved...");
      })
      .catch(err => Notify.create("emojirama not saved..."));
  },
  loadEmojirama: ({ state, commit }, payload) => {
    commit("loadEmojirama", { payload: null });
  },
  loadEmojiramaFromServer: ({ state, commit }, payload) => {
    payload.vm.$axios
      .get(`/api/emojirama/${payload.vm.$route.params.id}/`)
      .then(resp => {
        commit("loadEmojiramaFromServer", resp.data);
      });
  },
  toggleShowSquareConfig: (
    { state, commit, rootState, rootGetters },
    payload
  ) => {
    commit("setSquareConfigPosition", payload);
    commit("toggleShowSquareConfig");
    // vm.$store.commit("setSquareConfigPosition", position);
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
  move: (
    { state, commit, dispatch, rootState, getters, rootGetters },
    payload
  ) => {
    if (rootGetters.getMouseDown) {
      return;
    }
    const nextSquare = getters.getNextSquare(payload);
    if (nextSquare.portal) {
      commit("travelPortal", nextSquare.portal);
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
  setPortal: (state, payload) => {
    Vue.set(
      state.board["scenes"][payload.fromScene]["data"][payload.fromPos[0]][
        payload.fromPos[1]
      ],
      "portal",
      { toScene: payload.toScene, toPos: payload.toPos }
    );
  },
  travelPortal: (state, payload) => {
    state.currentScene = payload.toScene;
    state.position = payload.toPos;
    state.anchor = [payload.toPos[0] - 2, payload.toPos[1] - 2];
  },
  createNewScene: state => {
    const newScene = {
      data: generateBoard(20, 20),
      name: "newscene1"
    };
    const newSceneName = `Scene ${Math.floor(Math.random() * 10)}`;
    Vue.set(state.board["scenes"], newSceneName, newScene);
  },
  switchScene: (state, payload) => {
    state.currentScene = payload.nextScene;
  },
  loadEmojiramaFromServer: (state, payload) => {
    state.board = payload;
  },
  loadEmojirama: (state, payload) => {
    state.board = {
      scenes: {
        default: {
          data: generateBoard(40, 40)
        }
      }
    };
  },
  toggleMovementMode: state => {
    if (state.movementMode === "normal") {
      state.movementMode = "fixed";
    } else if (state.movementMode === "fixed") {
      state.movementMode = "normal";
    }
  },
  toggleShowSceneMenu: state => {
    state.showSceneMenu = !state.showSceneMenu;
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
            state.position = nextPos;
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
            state.position = nextPos;
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
            state.position = nextPos;
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
            state.position = nextPos;
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
