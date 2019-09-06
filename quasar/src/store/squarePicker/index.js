const state = {
  showSquarePicker: false,
  color: "red",
  emoji: "boy",
  tab: "emoji"
};

const getters = {
  showSquarePicker: s => s.showSquarePicker,
  getSquarePickerColor: s => s.color,
  getSquarePickerEmoji: s => s.emoji,
  getSquarePickerTab: s => s.tab
};

const mutations = {
  setSquarePickerTab: (state, payload) => {
    state.tab = payload;
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
