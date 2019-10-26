const state = {
  showSquarePicker: false,
  color: "#ffffff",
  emoji: "deciduous_tree",
  tab: "emoji",
  mode: "only_emoji",
  mouseDown: false,
  tone: "#ffc93a"
};

const getters = {
  getMouseDown: s => s.mouseDown,
  showSquarePicker: s => s.showSquarePicker,
  getSquarePickerColor: s => s.color,
  getSquarePickerTone: s => s.tone,
  getSquarePickerToneNumber: s => {
    const toneMap = {
      "#ffc93a": 1,
      "#fadcbc": 2,
      "#e0bb94": 3,
      "#bf8e68": 4,
      "#9b643c": 5,
      "#584539": 6
    };
    const toneNumber = toneMap[s.tone];
    console.log(toneNumber);
    return toneNumber;
  },
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
  setSquarePickerTone: (state, payload) => {
    console.log(payload);
    state.tone = payload;
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
