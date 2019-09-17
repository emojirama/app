const state = {
  showSquarePicker: false,
  color: "#ffffff",
  emoji: "boy",
  tab: "emoji",
  mode: "only_emoji",
  mouseDown: false
};

const getters = {
  getMouseDown: s => s.mouseDown,
  showSquarePicker: s => s.showSquarePicker,
  getSquarePickerColor: s => s.color,
  getSquarePickerEmoji: s => s.emoji,
  getSquarePickerTab: s => s.tab,
  getMode: s => s.mode
};

const mutations = {
  setMouseDown: (state, payload) => {
    state.mouseDown = payload;
  },
  setSquarePickerTab: (state, payload) => {
    state.tab = payload;
  },
  setMode: (state, payload) => {
    state.mode = payload;
  },
  toggleSquarePicker: state => {
    state.showSquarePicker = !state.showSquarePicker;
  },
  setSquarePickerColor: (state, payload) => {
    console.log(payload);
    state.color = payload;
  },
  setSquarePickerEmoji: (state, payload) => {
    console.log(payload);
    state.emoji = payload;
  }
};

export default {
  state,
  getters,
  mutations
};
