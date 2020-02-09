/* eslint-disable no-unused-vars */

import Vue from "vue";
import generateBoard from "./randomBoard";
import { Notify } from "quasar";
import uuidv1 from "uuid/v1";
import tinycolor from "tinycolor2";
import moveMutation from "./moveMutation";

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

  currentScene: "default",
  showSquareConfig: false,
  squareConfigPosition: [0, 0],
  movementMode: "normal",
  showSceneMenu: false,
  gridLineWidth: 0
};

const getters = {
  getGridLineWidth: s => s.gridLineWidth,
  getMovementMode: s => s.movementMode,
  getSquareSize: s => s.squareSize,
  getRows: s => s.rows,
  getCols: s => s.cols,
  getArea: s => s.area,
  // stats
  getCurrentSceneDimensions: s => {
    const boardData = s.board.scenes[s.currentScene]["data"];
    return [boardData.length, boardData[0].length];
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
  getCurrentScene: s => s.currentScene,
  getCurrentBoard: (state, getters) => {
    return getters.getFullBoard["scenes"][getters.getCurrentScene]["data"];
  },
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
    let nextSquare;
    try {
      nextSquare =
        s.board["scenes"][s.currentScene]["data"][nextSquarePos[0]][
          nextSquarePos[1]
        ];
    } catch (err) {
      nextSquare = null;
    }
    return nextSquare;
    // return s.board
  },
  getSceneOptions: s => {
    const scenes = Object.keys(s.board.scenes);
    return scenes;
  }
};

const actions = {
  /* eslint-disable no-unused-vars */

  createNewEmojiramaFromConfig: ({ rootGetters, commit }) => {
    const data = generateBoard(
      "biome",
      rootGetters["sceneConfig/getSceneConfig"]
    );
    console.log(data);
    commit("loadEmojirama", { data });
  },
  setZoom: ({ rootState, commit, state, getters, rootGetters }, payload) => {
    commit("setZoom", payload);
  },

  removePortal: ({ state, commit, rootGetters, getters }) => {
    const currentScene = getters.getCurrentScene;
    const currentPosition = getters.getSquareConfigPosition;
    const payload = { currentScene, currentPosition };
    commit("removePortal", payload);
  },
  createNewScene: ({ state, commit }, payload) => {
    commit("createNewScene", payload);
  },
  deleteScene: ({ state, commit }, payload) => {
    commit("deleteScene", payload);
  },
  setPortal: ({ state, commit }, payload) => {
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
  loadEmojirama: ({ state, commit, dispatch }, payload) => {
    commit("loadEmojirama", null);
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
  setSquare: ({ commit, getters, rootGetters }, payload) => {
    const min = rootGetters.getColorNoiseRange["min"];
    const max = rootGetters.getColorNoiseRange["max"];
    const currentEmoji = getters.getSquarePickerEmoji;
    const currentColor = tinycolor(getters.getSquarePickerColor)
      .darken(Math.random() * (max - min) + min)
      .toString();
    const currentTone = getters.getSquarePickerToneNumber;
    const mode = getters.getMode;
    const square_info = {
      mode,
      position: payload.position,
      color: currentColor,
      emoji: currentEmoji,
      tone: currentTone,
      scene: getters.getCurrentScene
    };
    if (payload.live) {
      payload.vm.$socket.send(
        JSON.stringify({
          message: { square_info },
          type: "update_square"
        })
      );
    } else {
      commit("setSquare", square_info);
    }
  },
  move: ({ commit, getters }, payload) => {
    const nextSquare = getters.getNextSquare(payload);
    if (nextSquare === null) {
      return;
    }
    if (nextSquare.portal) {
      commit("travelPortal", nextSquare.portal);
      return;
    }
    if (nextSquare.emoji !== "") {
      return;
    }
    const mode = getters.getMovementMode;
    commit("move", { direction: payload, mode });
  }
};

const mutations = {
  toggleGridLines: state => {
    if (state.gridLineWidth === 0) {
      state.gridLineWidth = 0.5;
    } else {
      state.gridLineWidth = 0;
    }
  },
  setZoom: (state, payload) => {
    state.squareSize = state.squareSize + payload;
    window.dispatchEvent(new Event("resize"));
  },
  setSquareFromWebsocket: (state, payload) => {
    const squareInfo = payload["message"]["square_info"];
    const { scene, position, emoji, color, mode } = squareInfo;
    const square =
      state.board["scenes"][scene]["data"][position[0]][position[1]];
    if (mode === "only_emoji") {
      square["emoji"] = emoji;
    } else if (mode === "only_color") {
      square["color"] = color;
    } else if (mode === "both") {
      square["emoji"] = emoji;
      square["color"] = color;
    } else if (mode === "delete_emoji") {
      square["emoji"] = "";
    }
  },
  removePortal: (state, payload) => {
    Vue.delete(
      state.board["scenes"][payload.currentScene]["data"][
        payload.currentPosition[0]
      ][payload.currentPosition[1]],
      "portal"
    );
  },
  deleteScene: (state, payload) => {
    Vue.delete(state.board["scenes"], payload);
  },
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
    Notify.create(`${payload.toScene}`);
  },
  createNewScene: (state, payload) => {
    const newScene = {
      data: generateBoard(payload, null),
      name: "newscene1"
    };
    const newSceneId = uuidv1();
    Vue.set(state.board["scenes"], newSceneId.slice(0, 8), newScene);
  },
  switchScene: (state, payload) => {
    state.currentScene = payload.nextScene;
  },
  loadEmojiramaFromServer: (state, payload) => {
    state.board = payload.board;
  },
  loadEmojirama: (state, payload) => {
    let data;
    if (payload) {
      data = payload.data;
    } else {
      data = generateBoard("biome", { dimensions: [50, 50] });
    }
    state.board = {
      scenes: {
        default: {
          data: data
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
    const [x, y] = payload["position"];
    const square = currentScene[x][y];
    if (payload.mode === "both") {
      square["emoji"] = payload.emoji;
      square["color"] = payload.color;
      square["tone"] = payload.tone;
    } else if (payload.mode === "only_emoji") {
      square["emoji"] = payload.emoji;
      square["tone"] = payload.tone;
    } else if (payload.mode === "only_color") {
      square["color"] = payload.color;
    } else if (payload.mode === "delete_emoji") {
      square["emoji"] = "";
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
  move: moveMutation
};

export default {
  state,
  getters,
  mutations,
  actions
};
